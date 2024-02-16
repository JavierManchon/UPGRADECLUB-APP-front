import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createComment(id: string, content: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      return of(null); // Devolver un observable con un valor nulo
    }
  
    return this.authService.getUserByToken(token).pipe(
      mergeMap((userData: any) => {
        if (!userData) {
          console.error('Datos de usuario no encontrados');
          return of(null); // Devolver un observable con un valor nulo
        }
  
        const userId = userData._id;
  
        return this.http.post(`http://localhost:3000/api/create-comment/${id}/${userId}`, { content });
      })
    );
  }

  getAllComments(id: string) {
    return this.http.get(`http://localhost:3000/api/comments/all/${id}`)
  }
}
