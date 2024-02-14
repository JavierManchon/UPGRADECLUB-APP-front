import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeToken: boolean = false;

  ngOnInit(): any {
    //Reviso si hay un token activo en el sessionStorage. y si lo hay me devuelve un true y si no me devuelve un false
    const token = sessionStorage.getItem('token');
    this.activeToken = !!token;
  }
}
