import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PostComponent } from './layouts/post/post.component';
import { CommentsListComponent } from './layouts/comments/comments-list/comments-list.component';
import { CommentFormComponent } from './layouts/comments/comment-form/comment-form.component';
import { ViewNavbarComponent } from './layouts/view-navbar/view-navbar.component';
import { BipCardComponent } from './layouts/bip-card/bip-card.component';
import { SingleBipComponent } from './pages/single-bip/single-bip.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignTokenInterceptor } from './auth/interceptors/assign-token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    PostComponent,
    CommentsListComponent,
    CommentFormComponent,
    ViewNavbarComponent,
    BipCardComponent,
    SingleBipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AssignTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
