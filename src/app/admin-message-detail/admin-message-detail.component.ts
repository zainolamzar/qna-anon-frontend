import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-admin-message-detail',
  templateUrl: './admin-message-detail.component.html',
  styleUrls: ['./admin-message-detail.component.css']
})
export class AdminMessageDetailComponent implements OnInit {
  message: any;
  errMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/admin-login']);
      return;
    }
    const messageId = this.route.snapshot.paramMap.get('id');
    if (messageId) {
      this.loadMessage(messageId);
    }
  }

  loadMessage(id: string): void {
    this.messageService.getMessageById(id).subscribe(
      (data) => {
        this.message = data;
        this.errMessage = null;
      },
      (error) => {
        if (error.status === 404) {
          this.errMessage = 'Message not found';
        } else {
          this.errMessage = 'Error fetching message';
        }
        console.error('Error fetching message:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}