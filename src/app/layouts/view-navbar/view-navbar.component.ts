import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-view-navbar',
  templateUrl: './view-navbar.component.html',
  styleUrls: ['./view-navbar.component.css']
})
export class ViewNavbarComponent implements OnInit {

  userData: any;
  activeNavOption: string = 'Home'; // Inicialmente, 'Home' está activo
  id: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    //Tengo que dejar este activo para que el condicional funcione en el html, ya que vaa ocmporbar si esta disponible el userData, si no no me lo va a renderzar (ver si hay una manera más optima, probablemente con rxjs)
    const token = JSON.parse(sessionStorage.getItem('token')!);
    this.authService.getUserByToken(token).subscribe({
      next: (response: any) => {
        this.id = response._id
        this.userData = response;
        console.log('Datos del usuario:', this.userData);
      },
      error: (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    });
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  handleNavigateProfile(id: string) {
    this.activeNavOption = 'Profile'; // Cambiar a 'Profile' cuando se hace clic en el perfil
    this.router.navigate([`profile/${this.id}`])
  }

  handleNavigateHome() {
    this.activeNavOption = 'Home'; // Cambiar a 'Home' cuando se hace clic en Home
    this.router.navigate(['']);
  }
}
