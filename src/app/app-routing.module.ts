import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingleBipComponent } from './pages/single-bip/single-bip.component';
import { verifyTokenGuard } from './auth/guards/verify-token.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'profile/:id', component: ProfileComponent, canActivate: [verifyTokenGuard]
  },
  {
    path: 'bip', component: SingleBipComponent, canActivate: [verifyTokenGuard]
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule)
  },
  {
    path: '**',redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
