import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  message: string = "";
  status: 'loading' | 'unauthorized' | 'success' | 'disabled' = 'disabled'
  registerForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(12)]]
    })

  }

  formHandler() {
    this.status = 'loading'
    if(this.registerForm.valid){
      const {username, email, password} = this.registerForm.value;
      const objectToSend = {
        username,
        email,
        password
      }
      this.authService.register(objectToSend).subscribe({
        next: (response: any) => {
          this.status = 'success'
          this.message = response.message
        },
        error: (error) => {
          console.log(error)
            this.status = 'unauthorized'
            this.message = error.error.message
        }
      })
      this.registerForm.reset()
    } else {
      this.status = 'unauthorized';
      this.message = "Asegurate de llenar todos los campos del formulario. Revisa si tu contraseña tiene 8-12 caracteres, mayusculas, minusculas y caracteres expeciales.";
    }
  }
}
