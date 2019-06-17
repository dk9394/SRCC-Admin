import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../categories.service';
import { ICategory } from '../category.model';
import { AppErrorService } from 'src/app/core/components/app-errors/app-error.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  @Input() availableCategories: ICategory[];
  @Output() newCategoryStatus = new EventEmitter<boolean>();
  @Input() editCategory: ICategory;
  categoryName = '';

  constructor(
    private catService: CategoriesService,
    private appErrService: AppErrorService
  ) { }

  ngOnInit() {
    if (this.editCategory) {
      this.categoryName = this.editCategory.name;
    } else {
      this.categoryName = '';
    }
  }

  onAdd(form: NgForm) {
    if (!this.availableCategories.find(cat => cat.name === form.value.name)) {
      if (this.editCategory) {
        this.catService.updateCategory(this.editCategory.id, form.value);
      } else {
        this.catService.addCategory(form.value);
      }
      this.newCategoryStatus.emit(false);
      form.reset();
    } else {
      this.appErrService.handleError({ subject: form.value.name, message: 'already exists.' });
    }
  }

  onCancel() {
    this.newCategoryStatus.emit(false);
  }

  checkNamesEquality() {
    if (this.editCategory) {
      if (this.editCategory.name !== this.categoryName) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

}
