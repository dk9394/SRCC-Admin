import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  next: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    this.checkLoginStatus();
    return this.next;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.checkLoginStatus();
    return this.next;
  }

  private checkLoginStatus() {
    this.authService.getSignInStatus()
      .subscribe((status) => {
        if (!status) {
          this.next = false;
          this.router.navigate(['/']);
        }
        this.next = true;
      });
  }

}
