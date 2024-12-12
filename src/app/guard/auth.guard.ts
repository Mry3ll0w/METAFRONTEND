import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const AuthGuard: CanActivateFn = (route, state) => {
  // Guardar el token de sesion
  const sessionToken = localStorage.getItem('sessionToken');
  const router = inject(Router);


  // Si no existe token de sesion, redirigir a /login
  if (sessionToken == null || sessionToken === '') {
    router.navigate(['/login']);
    return false;
  }
  else {
    return true;
  }

};
