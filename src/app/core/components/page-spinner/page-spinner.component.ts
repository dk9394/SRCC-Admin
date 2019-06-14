import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-page-spinner',
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.scss']
})
export class PageSpinnerComponent implements OnInit {
  isActive: boolean;

  constructor(
    private spinnerService: SpinnerService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.spinnerService.getSpinnerStatus()
      .subscribe((status: boolean) => {
        this.isActive = status;
        if (this.isActive) {
          this.document.querySelector('body').classList.add('no-scroll');
        } else {
          this.document.querySelector('body').classList.remove('no-scroll');
        }
      });
  }

}
