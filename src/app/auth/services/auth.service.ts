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
    return this.http.post('http://localhost:3000/api/login',user, { observe: 'response' })
  };

  logout() {
    return this.http.get('http://localhost:3000/api/logout')
  };

  getUserByToken(token: string){
    const headers = {
      "Authorization": `Bearer ${token}`
    }
    return this.http.get(`http://localhost:3000/api/get-user`, {headers})
  }

  getUserById(id: string) {
    return this.http.get(`http://localhost:3000/api/get-user/${id}`);
  }

  patchUser(id: string, userData: any) {
    return this.http.patch(`http://localhost:3000/api/edit/${id}`, userData)
  }

}
