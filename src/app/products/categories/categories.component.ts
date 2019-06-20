import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ICategory } from './category.model';
import { CategoriesService } from './categories.service';
import { AppErrorService } from 'src/app/core/components/app-errors/app-error.service';
import { HandleSubscriptionService } from 'src/app/core/services/handle-subscription.service';
import { AdminService } from 'src/app/core/services/admin.service';

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
  editCategory: ICategory;
  isAdmin: boolean;

  constructor(
    private catService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private appErrService: AppErrorService,
    private handleSubs: HandleSubscriptionService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.isAdmin = this.adminService.admin;
    this.isLoading = true;
    this.getAllCategories();
  }

  private getAllCategories() {
    this.catsSub = this.catService.fetchCategories()
      .subscribe((cats: ICategory[]) => {
        this.isLoading = false;
        this.categories = cats ? this.sortCategories(cats) : [];
      }, err => {
        this.appErrService.handleError({ subject: '', message: err.code });
      });
    this.handleSubs.dataSubcriptions.push(this.catsSub);
  }

  private sortCategories(cats: ICategory[]) {
    return cats.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName < bName) {
        return -1;
      } else if (aName > bName) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  onCategory(cat: ICategory) {
    this.catService.currentCategory = cat;
    this.router.navigate([cat.id], { relativeTo: this.route });
  }

  onCategoryActionStatus(status: boolean) {
    this.addNewCategory = status;
  }

  onEditCategory(category: ICategory, event: Event) {
    event.stopPropagation();
    this.editCategory = category;
    this.addNewCategory = true;
  }

  onAddNewCategory() {
    this.addNewCategory = true;
    this.editCategory = null;
  }

}
