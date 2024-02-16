import { BipsService } from 'src/app/layouts/services/bips.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Output() bipCreated = new EventEmitter<void>();

  createBipForm!: FormGroup;
  selectedFile!: File | null;
  content: string = "";
  selectedCategories: string[] = [];

  constructor(private fb: FormBuilder, private bipsService: BipsService){
    this.createBipForm = this.fb.group({
      content: ['', Validators.required],
      General: [false],
      React: [false],
      Angular: [false],
      Node: [false],
      Javascript: [false]
    })
  }

  onCheckboxChange(event: any) {
    const category = event.target.value;
    const checked = event.target.checked;

    // Actualizar el valor de la categoría correspondiente en el array
    if (checked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }

  isChecked(category: string) {
    // Verificar si la categoría está seleccionada
    return this.selectedCategories.includes(category);
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  createBip(){
    const formData = new FormData();

    const { content } = this.createBipForm.value;
    console.log(this.selectedCategories);

    //const categoriesAsString = this.selectedCategories.join(',');

    formData.append('content', content);
    formData.append('picture', this.selectedFile!);
    this.selectedCategories.forEach(category => {
      formData.append('categories', category);
    })
    console.log(formData.getAll("categories"));
    this.bipsService.createBip(formData).subscribe({
      next: (response) => {
          console.log(response);
          this.bipCreated.emit();

        // Reseteo los valores del formulario
        this.createBipForm.reset();
        this.selectedFile = null;
        this.selectedCategories = [];
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
