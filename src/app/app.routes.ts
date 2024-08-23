import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { LoanPageComponent } from './pages/loan-page/loan-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard], 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: DashboardComponent },
      { path: 'loans', component: LoanPageComponent },
    ],
  },
  { path: 'login', component: LoginComponent }
];
