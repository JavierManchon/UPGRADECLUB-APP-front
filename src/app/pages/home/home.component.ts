import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BipsService } from 'src/app/layouts/services/bips.service';
import { CommentsService } from 'src/app/layouts/services/comments.service';
import { map, tap } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeToken: boolean = false;
  bipsList: any;
  commentsList: any[] = [];
  usersMap: { [key: string]: any } = {};
  showCommentFormFor: string | null = null;

  constructor(private bipsService: BipsService, private authService: AuthService, private commentsService: CommentsService) {}

  ngOnInit(): any {
    //Reviso si hay un token activo en el sessionStorage. y si lo hay me devuelve un true y si no me devuelve un false
    const token = sessionStorage.getItem('token');
    this.activeToken = !!token;

    this.loadData();
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  updateBipsList() {
    this.loadData(); // Recargo los datos cada vez que se emite el evento bipCreated
  }

  private loadData() {
    this.bipsService.getAllBips().pipe(
      tap((response: any) => {
        response.forEach((bip: any) => {
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
      })
    ).subscribe({
      next: (response: any) => {
        this.bipsList = response;
        console.log(this.bipsList);
      },
      error: (error) => {
        console.error('Error al obtener los datos de los bips:', error);
      }
    });
  }

  getUserImage(userId: string): string {
    const userDetails = this.usersMap[userId];
    return userDetails ? userDetails.picture : '';
  }

  getUserName(userId: string): string {
    const userDetails = this.usersMap[userId];
    return userDetails ? userDetails.username : ''; 
  }

  showCommentForm(bipId: string) {
    if (this.showCommentFormFor === bipId) {
      this.showCommentFormFor = null;
    } else {
      this.showCommentFormFor = bipId;
    }

    
  }

  createComment(comment: string, bipId: string) {

    this.commentsService.createComment(bipId, comment).subscribe({
      next: (response: any) => {
        console.log('Comentario creado:', response);
        this.getAllComments(bipId);
      },
      error: (error) => {
        console.error('Error al crear el comentario:', error);
      }
    });
  }

  getAllComments(bipId: string) {
    this.commentsService.getAllComments(bipId).subscribe({
      next: (response: any) => {
        this.commentsList = response;
        console.log(this.commentsList);
        this.commentsList.forEach((comment: any) => {
          if (!this.usersMap[comment.user]) {
            this.authService.getUserById(comment.user).subscribe({
              next: (userDetails: any) => {
                this.usersMap[comment.user] = userDetails;
              },
              error: (error) => {
                console.error(`Error al obtener los detalles del usuario ${comment.user}:`, error);
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Error obteniendo comentarios:', error);
      }
    })
  }

  toggleCommentSection(bipId: string) {
    if (this.showCommentFormFor === bipId) {
        this.showCommentFormFor = null;
    } else {
        this.showCommentFormFor = bipId;
        this.getAllComments(bipId);
    }
}
  
}

