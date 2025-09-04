import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMessageDetailComponent } from './admin-message-detail/admin-message-detail.component';

export const routes: Routes = [
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-message-detail/:id', component: AdminMessageDetailComponent },
  { path: '', redirectTo: '/admin-login', pathMatch: 'full' }, // default route
  { path: '**', redirectTo: '/admin-login' }, // catch-all fallback
];
