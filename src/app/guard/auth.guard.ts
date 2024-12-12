import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/localStorage/local-storage.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  try {
    const sessionToken = storageService.getItem('sessionToken');

    // If session token doesn't exist, redirect to login
    if (!sessionToken) {
      router.navigateByUrl('/login', { replaceUrl: true });  // Forces the navigation to '/login' and removes the current route
      return false;
    }

    return true;
  } catch (e) {
    console.error('Error in AuthGuard:', e);
    router.navigateByUrl('/login', { replaceUrl: true });  // Forces the navigation to '/login' and removes the current route
    return false;
  }
};
