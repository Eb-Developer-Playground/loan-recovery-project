import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  console.log({isLoggedIn})
  const router = inject(Router)
  if(!isLoggedIn) {
    router.navigate(['/login'])
  }
  return true;
};
