import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private bipsService: BipsService ) {}

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
}
