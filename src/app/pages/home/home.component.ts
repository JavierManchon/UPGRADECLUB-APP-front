import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BipsService } from 'src/app/layouts/services/bips.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeToken: boolean = false;
  bipsList: any;
  usersMap: { [key: string]: any } = {};

  constructor(private bipsService: BipsService, private authService: AuthService) {}

  ngOnInit(): any {
    //Reviso si hay un token activo en el sessionStorage. y si lo hay me devuelve un true y si no me devuelve un false
    const token = sessionStorage.getItem('token');
    this.activeToken = !!token;

    this.bipsService.getAllBips().subscribe({
      next: (response: any) => {
        this.bipsList = response;
        console.log(this.bipsList);
        this.loadUsersDetails(); // Obtengo detalles de usuario después de obtener los bips
      },
      error: (error) => {
        console.error('Error al obtener los datos de los bips:', error);
      }
    });
  }

  loadUsersDetails() {
    this.bipsList.forEach((bip: any) => {
      if (!this.usersMap[bip.user]) {
        this.authService.getUserById(bip.user).subscribe({
          next: (userDetails: any) => {
            this.usersMap[bip.user] = userDetails;
          },
          error: (error) => {
            console.error(`Error al obtener los detalles del usuario ${bip.user}:`, error);
          }
        });
      }
    });
  }

  // Función para obtener la imagen del usuario por ID
  getUserImage(userId: string): string {
    const userDetails = this.usersMap[userId];
    return userDetails ? userDetails.picture : ''; // Retorna la imagen del usuario o una cadena vacía si no hay imagen
  }

  // Función para obtener el nombre del usuario por ID
  getUserName(userId: string): string {
    const userDetails = this.usersMap[userId];
    return userDetails ? userDetails.username : ''; // Retorna el nombre del usuario o una cadena vacía si no hay nombre
  }
}

