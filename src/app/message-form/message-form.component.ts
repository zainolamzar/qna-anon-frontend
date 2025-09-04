import { Component } from '@angular/core';
import { MessageService } from '../services/message/message.service';
import { SnackbarService } from '../services/snackbar/snackbar.service'; // Import the SnackbarService

@Component({
    selector: 'app-message-form',
    templateUrl: './message-form.component.html',
    styleUrls: ['./message-form.component.css'],
    standalone: false
})
export class MessageFormComponent {
  messageContent: string = '';

  constructor(
    private messageService: MessageService,
    private snackbarService: SnackbarService // Inject the SnackbarService
  ) { }

  submitMessage(): void {
    if (!this.messageContent.trim()) {
      this.snackbarService.showError('Please enter a message.');
      return;
    }
    
    if (this.messageContent.split(' ').length > 100) {
      this.snackbarService.showError('Message should not exceed 100 words.');
      return;
    }

    const messageData = this.messageContent;

    this.messageService.submitMessage(messageData).subscribe(
      () => {
        this.snackbarService.showSuccess('Message submitted successfully.');
        this.messageContent = ''; // Clear the message input field
      },
      (error) => {
        console.error('Error submitting message:', error);
        this.snackbarService.showError('Failed to submit message.');
      }
    );
  }
}