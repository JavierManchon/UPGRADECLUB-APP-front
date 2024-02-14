import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post('http://localhost:3000/api/register', user)
  };

  login(user: any) {
    const token = sessionStorage.getItem('token');
    console.log('Token incluido en la solicitud:', token);
    return this.http.post('http://localhost:3000/api/login',user, { observe: 'response' })
  };

  logout() {
    return this.http.get('http://localhost:3000/api/logout')
  };

  getUserByToken(){
    return this.http.get(`http://localhost:3000/api/get-user`)
  }

}
