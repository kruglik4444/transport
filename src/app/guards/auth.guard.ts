import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../core/pages/login/login.service';
import { filter, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  return loginService.user.pipe(
    filter((user) => user !== undefined),
    map((user) => {
      if(!user) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
