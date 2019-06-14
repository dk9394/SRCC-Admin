import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerStatus = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.spinnerStatus.next(true);
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
          this.spinnerStatus.next(false);
        }
      });
  }

  getSpinnerStatus() {
    return this.spinnerStatus.asObservable();
  }
}
