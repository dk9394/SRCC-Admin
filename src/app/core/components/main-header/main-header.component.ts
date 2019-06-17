import { Component, OnInit } from '@angular/core';

import { INavLink } from '../../models';
import { Constants } from '../../constants';
import { AuthService } from 'src/app/auth/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  navLinks: INavLink[] = [];
  userSignedIn: boolean;
  isNavigationCancelEvent: boolean;
  activeHamburger: boolean;

  constructor(
    private authService: AuthService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.authService.getSignInStatus()
      .subscribe((status: boolean) => {
        this.userSignedIn = status;
        this.createNavLinks();
        this.navLinksVisibility(this.adminService.admin);
      });
  }

  private createNavLinks() {
    this.navLinks = [];
    Constants.appNavLinks.forEach(link => {
      this.navLinks.push({ ...link });
    });
  }

  private navLinksVisibility(isAdmin: boolean) {
    if (isAdmin) {
      this.navLinks.forEach(link => link.active = true);
    }
  }

  onMobileNav() {
    this.activeHamburger = !this.activeHamburger;
  }

}
