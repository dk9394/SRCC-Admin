import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import { SpinnerService } from 'src/app/core/components/page-spinner/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
  }

  signInUser(form: NgForm) {
    this.spinnerService.spinnerStatus.next(true);
    this.authService.signIn(form.value.email, form.value.password);
  }

}
