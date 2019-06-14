import { Component, OnInit } from '@angular/core';

import { AppErrorService } from './app-error.service';
import { IError } from './errors.model';

@Component({
  selector: 'app-app-errors',
  templateUrl: './app-errors.component.html',
  styleUrls: ['./app-errors.component.scss']
})
export class AppErrorsComponent implements OnInit {
  errorMsg: IError;
  successMsg: IError;
  private interval: any;

  constructor(
    private appErrService: AppErrorService
  ) { }

  ngOnInit() {
    this.appErrService.getError()
      .subscribe((err: IError) => {
        if (this.successMsg) {
          this.successMsg = null;
        }
        this.errorMsg = err ? err : null;
        this.autoRemoveAlert(this.errorMsg);
      });
    this.appErrService.getSuccess()
      .subscribe((msg: IError) => {
        if (this.errorMsg) {
          this.errorMsg = null;
        }
        this.successMsg = msg ? msg : null;
        this.autoRemoveAlert(this.successMsg);
      });
  }

  private autoRemoveAlert(msg: string | IError) {
    if (msg) {
      this.interval = setTimeout(() => {
        this.errorMsg = null;
        this.successMsg = null;
      }, 2500);
    }
  }

  onCross() {
    this.errorMsg = null;
    this.successMsg = null;
    clearInterval(this.interval);
  }

}
