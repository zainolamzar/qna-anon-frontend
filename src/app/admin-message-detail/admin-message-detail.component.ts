import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../services/message/message.service';
import { AuthService } from '../services/auth/auth.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-admin-message-detail',
  templateUrl: './admin-message-detail.component.html',
  styleUrls: ['./admin-message-detail.component.css']
})
export class AdminMessageDetailComponent implements OnInit {
  message: any;
  errMessage: string | null = null;

  @ViewChild('detailCard') detailCardRef!: ElementRef;

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

  downloadCard(): void {
    const detailCard = this.detailCardRef.nativeElement;
    html2canvas(detailCard).then(canvas => {
      // Convert canvas to PNG image data
      const imgData = canvas.toDataURL('image/png');

      // Create temporary link element
      const a = document.createElement('a');
      a.href = imgData;
      a.download = 'message-detail.png'; // Set the filename for download
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }
}