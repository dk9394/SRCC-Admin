import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SpinnerService } from '../page-spinner/spinner.service';
import { IError } from './errors.model';

@Injectable({
  providedIn: 'root'
})
export class AppErrorService {
  error = new Subject<IError>();
  success = new Subject<IError>();

  constructor(private spinnerService: SpinnerService) { }

  getError() {
    return this.error.asObservable();
  }

  getSuccess() {
    return this.success.asObservable();
  }

  handleError(err: IError) {
    this.spinnerService.spinnerStatus.next(false);
    let errMsg = (err.message as string).replace('auth/', '').split('-').join(' ');
    errMsg = errMsg.slice(0, 1).toUpperCase() + errMsg.slice(1);
    const error: IError = { subject: err.subject, message: errMsg };
    this.error.next(error);
  }

  handleSuccess(msg: IError) {
    this.spinnerService.spinnerStatus.next(false);
    this.success.next(msg);
  }
}
