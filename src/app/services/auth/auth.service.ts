import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private http: HttpClient) { }

  login(id:null, username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<any>('http://localhost:5000/api/users/login', { id, username, password }).subscribe(
        (response) => {
          if (response && response.success) {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            resolve(true);
          } else {
            reject(false);
          }
        },
        (error) => {
          console.error('Error logging in:', error);
          reject(false);
        }
      );
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }
}