import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000; // Duration in milliseconds
    config.panelClass = ['success-snackbar']; // Custom CSS class
    config.verticalPosition = 'top'; // Position at the top of the screen
    config.horizontalPosition = 'center'; // Center horizontally

    this.snackBar.open(message, 'Close', config);
  }

  showError(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['error-snackbar'];
    config.verticalPosition = 'top';
    config.horizontalPosition = 'center';

    this.snackBar.open(message, 'Close', config);
  }
}