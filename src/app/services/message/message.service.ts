import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from '../snackbar/snackbar.service'; // Import your SnackbarService

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'https://qna-anonymous-server.onrender.com/api/messages';

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService // Inject SnackbarService
  ) { }

  submitMessage(messageData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(this.apiUrl, { messageContent: messageData }, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.message.includes('duplicate key error')) {
            this.snackbarService.showError('Message with this ID already exists.');
          } else {
            this.snackbarService.showError('Failed to submit message.');
          }
          return throwError('Error submitting message.');
        })
      );
  }
}
