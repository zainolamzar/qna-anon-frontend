import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css'],
    standalone: false
})
export class AdminDashboardComponent implements OnInit {
  messages: any[] = [];

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/admin-login']);
    }
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(
      (data) => {
        this.messages = data.map(message => ({ ...message, opened: false }));
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin-login']);
  }
}