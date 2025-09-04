import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from '../services/message/message.service';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule]
})
export class AdminDashboardComponent implements OnInit {
  messages: any[] = [];

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/admin-login']);
    }
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(
      (data) => {
        this.messages = data.map(message => ({ ...message, selected: false }));
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

  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.messages.forEach(m => m.selected = checked);
  }

  hasSelected(): boolean {
    return this.messages.some(m => m.selected);
  }

  deleteMessage(id: string): void {
    if (confirm('Are you sure you want to delete this message?')) {
      this.messageService.deleteMessage(id).subscribe(() => {
        this.loadMessages();
      });
    }
  }

  deleteSelected(): void {
    if (!this.hasSelected()) return;
    if (confirm('Are you sure you want to delete selected messages?')) {
      const selectedIds = this.messages.filter(m => m.selected).map(m => m._id);
      let deleteCount = 0;

      selectedIds.forEach(id => {
        this.messageService.deleteMessage(id).subscribe(() => {
          deleteCount++;
          if (deleteCount === selectedIds.length) {
            this.loadMessages();
          }
        });
      });
    }
  }

  deleteAll(): void {
    if (confirm('Are you sure you want to delete ALL messages?')) {
      this.messageService.deleteAllMessages().subscribe(() => {
        this.loadMessages();
      });
    }
  }
}