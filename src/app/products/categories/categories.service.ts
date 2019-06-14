import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { ICategory } from './category.model';
import { AppErrorService } from 'src/app/core/components/app-errors/app-error.service';
import { Constants } from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private collection = Constants.collections.categoriesCollection;
  currentCategory: ICategory;

  constructor(
    private afs: AngularFirestore,
    private appErrService: AppErrorService
  ) { }

  fetchCategories() {
    return this.afs.collection(this.collection).snapshotChanges()
      .pipe(
        map(colls => {
          return colls.map(col => {
            return {
              id: col.payload.doc.id,
              ...col.payload.doc.data()
            };
          });
        })
      );
  }

  addCategory(newCategory: ICategory) {
    this.afs.collection(this.collection).add(newCategory)
      .then(res => {
        this.appErrService.handleSuccess({ subject: newCategory.name, message: 'is created successfully.' });
      })
      .catch(err => {
        this.appErrService.handleError({ subject: '', message: err.code });
      });
  }

  removeCategory(categoryId: string) {
    return this.afs.collection(this.collection).doc(categoryId).delete();
  }

}
