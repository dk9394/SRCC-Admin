import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AppErrorService } from '../core/components/app-errors/app-error.service';
import { HandleSubscriptionService } from '../core/services/handle-subscription.service';
import { environment } from 'src/environments/environment';
import { AdminService } from '../core/services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signInStatus = new BehaviorSubject<boolean>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private appErrService: AppErrorService,
    private handleSubs: HandleSubscriptionService,
    private adminService: AdminService
  ) { }

  signIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        if (res.user.email === environment.userEmail) {
          this.adminService.admin = true;
        } else {
          this.adminService.admin = false;
        }
        this.signInStatus.next(true);
        this.router.navigate(['/products']);
        this.appErrService.handleSuccess({ subject: 'Login', message: 'successful.' });
      })
      .catch(err => {
        this.signInStatus.next(false);
        this.appErrService.handleError({ subject: '', message: err.code });
      });
  }

  signOut() {
    this.handleSubs.handleSubcriptions();
    this.afAuth.auth.signOut()
      .then(res => {
        this.router.navigate(['/']);
        this.signInStatus.next(false);
        this.appErrService.handleSuccess({ subject: 'Logout', message: 'successful.' });
      })
      .catch(err => {
        this.appErrService.handleError({ subject: '', message: err.code });
      });
  }

  getSignInStatus() {
    return this.signInStatus.asObservable();
  }

}
