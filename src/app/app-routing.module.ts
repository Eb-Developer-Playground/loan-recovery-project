import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoanPageComponent } from './pages/loan-page/loan-page.component';
import { LogoutComponent } from './views/logout/logout.component'; // Import the LogoutComponent

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'loan/:loanType', component: LoanPageComponent },
  { path: 'logout', component: LogoutComponent }, // Add route for LogoutComponent
  { path: '**', redirectTo: '/login' } // Wildcard route for undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
