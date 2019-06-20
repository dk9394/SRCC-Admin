import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ISellType } from 'src/app/core/models';
import { Constants } from 'src/app/core/constants';

@Component({
  selector: 'app-sell-product-landing',
  templateUrl: './sell-product-landing.component.html',
  styleUrls: ['./sell-product-landing.component.scss']
})
export class SellProductLandingComponent implements OnInit {
  sellProductTypes: ISellType[] = Constants.sellTypes;
  sellShopProduct: boolean;
  sellThirdPartyProduct: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.setSellType();
  }

  onSellType(type: string) {
    this.sellProductTypes.forEach(sellType => {
      sellType.code === type ? sellType.active = true : sellType.active = false;
    });
    this.setSellType();
  }

  private setSellType() {
    this.sellProductTypes.forEach(sellType => {
      if (sellType.active) {
        this.router.navigate([sellType.code], { relativeTo: this.route });
      }
    });
  }
}
