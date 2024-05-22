import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  login(id:null, username: string, password: string): void {
    this.authService.login(id, username, password).then(
      () => {
        this.router.navigate(['/admin-dashboard']);
      },
      () => {
        alert('Invalid username or password');
      }
    );
  }
}