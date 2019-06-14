import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ICategory } from './category.model';
import { CategoriesService } from './categories.service';
import { AppErrorService } from 'src/app/core/components/app-errors/app-error.service';
import { HandleSubscriptionService } from 'src/app/core/services/handle-subscription.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[];
  isLoading: boolean;
  addNewCategory: boolean;
  catsSub: Subscription;

  constructor(
    private catService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private appErrService: AppErrorService,
    private handleSubs: HandleSubscriptionService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getAllCategories();
  }

  private getAllCategories() {
    this.catsSub = this.catService.fetchCategories()
      .subscribe((cats: ICategory[]) => {
        this.isLoading = false;
        this.categories = cats ? cats : [];
      }, err => {
        this.appErrService.handleError({ subject: '', message: err.code });
      });
    this.handleSubs.dataSubcriptions.push(this.catsSub);
  }

  onCategory(cat: ICategory) {
    this.catService.currentCategory = cat;
    this.router.navigate([cat.id], { relativeTo: this.route });
  }

  onAddNewCategory(status: boolean) {
    this.addNewCategory = status;
  }

}
