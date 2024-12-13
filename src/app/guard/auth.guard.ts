import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/localStorage/local-storage.service';
import { AuthService } from '../services/auth-service.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  try {
    const sessionToken = storageService.getItem('sessionToken');

    // If session token doesn't exist, redirect to login
    if (!sessionToken) {
      router.navigateByUrl('/login', { replaceUrl: true });  // Forces the navigation to '/login' and removes the current route
      return false;
    } else {
      // If session token exists, we check if it's valid
      authService.isAuthorized().then((isAuthorized) => {
        if (!isAuthorized) {
          storageService.removeItem('sessionToken')
          router.navigateByUrl('/login', { replaceUrl: true });  // Forces the navigation to '/login' and removes the current route
          return false;
        }
        return true;
      });
    }

    return true;
  } catch (e) {
    console.error('Error in AuthGuard:', e);
    router.navigateByUrl('/login', { replaceUrl: true });  // Forces the navigation to '/login' and removes the current route
    return false;
  }
};
