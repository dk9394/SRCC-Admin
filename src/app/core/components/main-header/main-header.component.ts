import { Component, OnInit } from '@angular/core';
import { Router, NavigationCancel } from '@angular/router';

import { INavLink } from '../../models';
import { Constants } from '../../constants';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  navLinks: INavLink[] = Constants.appNavLinks;
  userSignedIn: boolean;
  isNavigationCancelEvent: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getSignInStatus()
      .subscribe((status: boolean) => {
        this.userSignedIn = status;
      });
  }

}
