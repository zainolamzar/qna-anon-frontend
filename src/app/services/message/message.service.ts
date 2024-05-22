import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiUrl = 'http://localhost:5000/api/messages';

  constructor(private http: HttpClient) { }

  submitMessage(message: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { content: message });
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMessageById(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}