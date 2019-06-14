import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-page-spinner',
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.scss']
})
export class PageSpinnerComponent implements OnInit {
  isActive: boolean;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.spinnerService.getSpinnerStatus()
      .subscribe((status: boolean) => {
        this.isActive = status;
      });
  }

}
