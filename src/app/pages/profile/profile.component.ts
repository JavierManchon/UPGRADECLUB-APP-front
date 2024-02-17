import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BipsService } from 'src/app/layouts/services/bips.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;
  bipsList: any;
  showEditForm: boolean = false;
  newUsername: string = '';
  newPicture: File | null = null;
  loading: boolean = true;

  constructor(private authService: AuthService, private bipsService: BipsService, private router: Router, private route: ActivatedRoute  ) {}

  ngOnInit() {
    const token = JSON.parse(sessionStorage.getItem('token')!);
    this.authService.getUserByToken(token).subscribe({
      next: (response: any) => {
        this.userData = response;
        console.log('Datos del usuario:', this.userData);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    });

    this.bipsService.getBips().subscribe({
      next: (response: any) => {
        this.bipsList = response.reverse();
        console.log(this.bipsList);
      },
      error: (error) => {
        console.error('Error al obtener los datos de los bips:', error);
      }
    });
  }

  deleteBip(bipId: string) {
    this.bipsService.deleteBip(bipId).subscribe({
      next: (response: any) => {
        console.log('Bip eliminado:', response);
        this.refreshBips();
      },
      error: (error) => {
        console.error('Error al eliminar el bip:', error);
      }
    });
  }

  refreshBips() {
    this.bipsService.getBips().subscribe({
      next: (response: any) => {
        this.bipsList = response;
        console.log(this.bipsList);
      },
      error: (error) => {
        console.error('Error al obtener los datos de los bips:', error);
      }
    });
  }

  //Funciones para controlar la vista del formulario que modifica la info del user

  toggleEditForm() {
    this.showEditForm = !this.showEditForm;
  }

  onCancelEdit() {
    this.showEditForm = false;
  }

  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.newPicture = inputElement.files[0];
    } else {
      this.newPicture = null;
    }
  }

  updateUserProfile() {
    const formData = new FormData();
    if (this.newUsername) {
      formData.append('username', this.newUsername);
    }
    if (this.newPicture) {
      formData.append('picture', this.newPicture);
    }

    const token = JSON.parse(sessionStorage.getItem('token')!);
    this.authService.patchUser(this.userData._id, formData).subscribe({
      next: (response) => {
        console.log('Perfil actualizado correctamente:', response);
        //Recargo con la informacion actualizada del usuario
        this.authService.getUserByToken(token).subscribe({
          next: (response: any) => {
            this.userData = response;
            console.log('Datos del usuario:', this.userData);
          },
          error: (error) => {
            console.error('Error al obtener los datos del usuario:', error);
          }
        });
        // Reinicio los valores
        this.showEditForm = false;
        this.newUsername = '';
        this.newPicture = null;
      },
      error: (error) => {
        console.error('Error al actualizar el perfil:', error);
      }
    });
  }
}
