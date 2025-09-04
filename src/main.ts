import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { MessageService } from './app/services/message/message.service';
import { AuthService } from './app/services/auth/auth.service';
import { AuthGuard } from './app/services/auth/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    MessageService,
    AuthService,
    AuthGuard
  ]
}).catch(err => console.error(err));