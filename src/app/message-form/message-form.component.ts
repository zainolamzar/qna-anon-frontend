import { Component } from '@angular/core';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {
  messageContent: string = '';

  constructor(private messageService: MessageService) { }

  submitMessage(): void {
    if (!this.messageContent.trim()) {
      alert('Please enter a message.');
      return;
    }
    
    if (this.messageContent.split(' ').length > 100) {
      alert('Message should not exceed 100 words.');
      return;
    }

    const messageData = this.messageContent;

    this.messageService.submitMessage(messageData).subscribe(
      () => {
        console.log('Message submitted successfully');
        this.messageContent = ''; // Clear the message input field
        window.location.reload(); // Refresh back to the root route
      },
      (error) => {
        console.error('Error submitting message:', error);
      }
    );
  }
}