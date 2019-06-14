import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  next: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.getSignInStatus()
      .subscribe((status) => {
        if (!status) {
          this.next = false;
          this.router.navigate(['/']);
        }
        this.next = true;
      });
    return this.next;
  }
}
