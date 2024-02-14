import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string = "";
  password: string = "";
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router){}

  handleLogin() {
    const regExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;
    const userObject = {
      email: this.email,
      password: this.password
    }
      this.authService.login(userObject).subscribe({
        next: (response: any) => {
            if(response){
              console.log(response);
              sessionStorage.setItem('token', JSON.stringify(response.body.token))
                this.router.navigate(['home'])
            }
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = 'El usuario no existe o las credenciales son incorrectas.';
        }
      })
  }
}
