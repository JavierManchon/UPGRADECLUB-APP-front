import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService ) {}

  ngOnInit() {
    this.authService.getUserByToken().subscribe({
      next: (response: any) => {
        this.userData = response;
        console.log('Datos del usuario:', this.userData);
      },
      error: (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    });
  }
  

}
