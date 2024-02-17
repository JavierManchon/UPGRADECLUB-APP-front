import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post('https://upgradeclub-app-back.vercel.app/api/register', user)
  };

  login(user: any) {
    return this.http.post('https://upgradeclub-app-back.vercel.app/api/login',user, { observe: 'response' })
  };

  logout() {
    return this.http.get('https://upgradeclub-app-back.vercel.app/api/logout')
  };

  getUserByToken(token: string){
    const headers = {
      "Authorization": `Bearer ${token}`
    }
    return this.http.get(`https://upgradeclub-app-back.vercel.app/api/get-user`, {headers})
  }

  getUserById(id: string) {
    return this.http.get(`https://upgradeclub-app-back.vercel.app/api/get-user/${id}`);
  }

  patchUser(id: string, userData: any) {
    return this.http.patch(`https://upgradeclub-app-back.vercel.app/api/edit/${id}`, userData)
  }

}
