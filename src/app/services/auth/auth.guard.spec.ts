import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard'; // Ensure this path is correct based on your project structure
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let authService: AuthService;
  let router: Router;
  let authGuard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should allow the authenticated user to access the route', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    expect(authGuard.canActivate({} as any, {} as any)).toBe(true);
  });

  it('should not allow the unauthenticated user to access the route', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');
    expect(authGuard.canActivate({} as any, {} as any)).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/admin-login']);
  });
});