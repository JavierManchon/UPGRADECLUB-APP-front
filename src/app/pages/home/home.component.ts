import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BipsService } from 'src/app/layouts/services/bips.service';
import { CommentsService } from 'src/app/layouts/services/comments.service';
import { tap } from 'rxjs';
import { Bip } from '../interfaces/Bip.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activeToken: boolean = false;
  bipsList: Bip[] = [];
  commentsList: any[] = [];
  usersMap: { [key: string]: any } = {};
  showCommentFormFor: string | null = null;
  likes: number = 0;
  liked: boolean = false;
  activeUserId: string = '';
  loading: boolean = true;
  //FIXED: Para almacenar la informacion d elso comentarios de cada bip de manera independiente guardo lso id de cada comentario en y los asocio a un bip concreto.
  bipComments: { [key: string]: any[] } = {};

  constructor(private bipsService: BipsService, private authService: AuthService, private commentsService: CommentsService) {}

  ngOnInit(): any {
    //Reviso si hay un token activo en el sessionStorage. y si lo hay me devuelve un true y si no me devuelve un false
    const token = sessionStorage.getItem('token');
    this.activeToken = !!token;
    this.loadData();

    if (token !== null) {
      this.activeToken = true;
      this.authService.getUserByToken(token).subscribe({
          next: (response: any) => {
              this.activeUserId = response._id;
              console.log('Datos del usuario:', response);           
          },
          error: (error) => {
              console.error('Error al obtener los datos del usuario:', error);
          }
      });
    }

  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  updateBipsList() {
    this.loadData(); // Recargo los datos cada vez que se emite el evento bipCreated
  }

  getNumberOfComments(bipId: string): number {
    const comments = this.bipComments[bipId];
    return comments ? comments.length : 0;
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
        this.bipsList = response.reverse();
        console.log(this.bipsList);
        //Una vez tengo toda la info puedo renderizar los comentarios correspondientes
        this.bipsList.forEach(bip => {
          this.getAllComments(bip._id);
        });   
        this.loading = false;
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
        const comments = response.reverse();
        //Guardo los comentarios en el bip asociado
        this.bipComments[bipId] = comments;
        comments.forEach((comment: any) => {
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
        //Compruebo si ya estan cargados los comentarios para este bip concreto
        if (!this.bipComments[bipId]) {
          this.getAllComments(bipId);
        }
    }
  }

  handleLikes(bipId: string): void {
    const bip: Bip | undefined = this.bipsList.find((b: Bip) => b._id === bipId);
    if (!bip) return;
  
    const userIndex: number = bip.likes.indexOf(this.activeUserId);
  
    if (userIndex === -1) {
      bip.likes.push(this.activeUserId);
    } else {
      bip.likes.splice(userIndex, 1);
    }
  
    this.bipsService.patchLikes(bipId, bip.likes).subscribe({
      next: (updatedBip: any) => {
        console.log('like actualizado:', updatedBip);
      },
      error: (error) => {
        console.error('Error al dar like:', error);
      }
    });
  }
  
  
}

