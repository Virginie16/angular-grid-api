import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BiochargeComponent } from './biocharge/biocharge.component';
import { ChangeControlComponent } from './change-control/change-control.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'biocharge',
    component: BiochargeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'change-control',
    component: ChangeControlComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
