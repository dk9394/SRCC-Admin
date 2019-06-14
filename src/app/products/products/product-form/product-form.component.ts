import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ICategory } from '../../categories/category.model';
import { ProductService } from '../product.service';
import { AppErrorService } from 'src/app/core/components/app-errors/app-error.service';
import { IProduct } from '../product.model';
import { CanComponentDeactivate } from 'src/app/core/guards/can-deactivate.guard';
import { CategoriesService } from '../../categories/categories.service';
import { SpinnerService } from 'src/app/core/components/page-spinner/spinner.service';

const uniqueFieldValidator: ValidatorFn = (control: FormArray): ValidationErrors | null => {
  const fields: string[] = [];
  let errorState = null;
  control.controls.forEach((c: FormGroup, i) => {
    if (c.get('field').valid) {
      const field = (c.get('field').value as string).toLowerCase().trim();
      if (fields.includes(field)) {
        c.get('field').setErrors({ notUnique: true });
        errorState = { notUniqueFields: true };
      } else {
        fields.push(field);
      }
    }
  });
  return errorState;
};

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, CanComponentDeactivate {
  editMode: boolean;
  formTitle: string;
  productForm: FormGroup;
  additionalInfo = false;
  currentCategory: ICategory;
  editProduct: IProduct;
  isFormSaved: boolean;
  warrantyYears = [];
  warrantyMonths = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private appErrService: AppErrorService,
    private catService: CategoriesService,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.isFormSaved = false;
    this.warrantyMonths = this.createCountArray(11);
    this.warrantyYears = this.createCountArray(10);
    this.currentCategory = this.catService.currentCategory;
    this.initializeForm();
    this.editMode = this.route.snapshot.paramMap.get('productId') ? true : false;
    if (this.editMode) {
      this.editProduct = this.productService.currentProduct;
      this.formTitle = this.editProduct.name;
      this.editFormSetValue(this.editProduct);
    } else {
      this.formTitle = this.currentCategory.name;
    }
  }

  private editFormSetValue(editProduct: IProduct) {
    this.productForm.setValue({
      name: editProduct.name,
      images: editProduct.images,
      warranty: {
        years: editProduct.warranty.years,
        months: editProduct.warranty.months
      },
      internal_information: {
        purchase_date: editProduct.internal_information.purchase_date,
        purchase_price: editProduct.internal_information.purchase_price,
        purchase_from: editProduct.internal_information.purchase_from,
        sale_price: editProduct.internal_information.sale_price,
        quantity: editProduct.internal_information.quantity
      },
      general_information: this.setFormArrayControls('general_information', editProduct.general_information),
      technical_information: this.setFormArrayControls('technical_information', editProduct.technical_information)
    });
    this.additionalInfo = (!!editProduct.general_information.length || !!editProduct.technical_information.length);
  }

  private setFormArrayControls(formArrayName: string, value: { field: string, value: string }[]) {
    const groupValue = [];
    if (value.length) {
      value.forEach(v => {
        this.onAddNewFormArrayControls(`${formArrayName}`);
        groupValue.push(v);
      });
    }
    return groupValue;
  }

  private initializeForm() {
    this.productForm = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.required, Validators.minLength(3)]),
      images: this.formBuilder.control([]),
      warranty: this.formBuilder.group({
        years: this.formBuilder.control(null, Validators.required),
        months: this.formBuilder.control(null, Validators.required)
      }),
      internal_information: this.formBuilder.group({
        purchase_date: this.formBuilder.control(this.getTodayDate(), Validators.required),
        purchase_from: this.formBuilder.control(null, Validators.required),
        purchase_price: this.formBuilder.control(null, Validators.required),
        sale_price: this.formBuilder.control(null, Validators.required),
        quantity: this.formBuilder.control(null, Validators.required)
      }),
      general_information: this.formBuilder.array([], [uniqueFieldValidator]),
      technical_information: this.formBuilder.array([], [uniqueFieldValidator])
    });
  }

  getTodayDate() {
    const today = new Date();
    let dd: number | string = today.getDate();
    let mm: number | string = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return `${yyyy}-${mm}-${dd}`;
  }

  private createCountArray(count: number) {
    const countArray = [];
    for (let i = 0; i <= count; i++) {
      countArray.push(i);
    }
    return countArray;
  }

  getFormArrayControls(formArrayName: string) {
    return (this.productForm.get(formArrayName) as FormArray).controls;
  }

  getFormArrayControl(formArraypName: string, formGroupIndex: number, controlName: string) {
    return this.productForm.get(formArraypName).get(`${formGroupIndex}`).get(controlName);
  }

  checkFormArrayControlValidity(formArraypName: string, formGroupIndex: number, controlName: string) {
    const control = this.getFormArrayControl(formArraypName, formGroupIndex, controlName);
    return (control.touched && !control.valid);
  }

  getArrayFormGroup(formArraypName: string, formGroupIndex: number) {
    return this.productForm.get(formArraypName).get(`${formGroupIndex}`);
  }

  onAddNewFormArrayControls(formArrayName: string) {
    const newFormGroup = this.getArrayFormControls();
    (this.productForm.get(formArrayName) as FormArray).push(newFormGroup);
  }

  private getArrayFormControls() {
    return this.formBuilder.group({
      field: this.formBuilder.control(null, [Validators.required, Validators.minLength(2)]),
      value: this.formBuilder.control(null, Validators.required)
    });
  }

  onRemoveArrayControl(formArrayName: string, index: number) {
    (this.productForm.get(formArrayName) as FormArray).removeAt(index);
  }


  onAdditionalInfoToggle(formArrayNames: string[]) {
    this.additionalInfo = !this.additionalInfo;
    if (!this.additionalInfo) {
      formArrayNames.map(formArr => {
        const formArray = (this.productForm.get(`${formArr}`) as FormArray);
        formArray.controls = [];
        formArray.reset();
      });
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    this.spinnerService.spinnerStatus.next(true);
    const productName = (this.productForm.value as IProduct).name;
    if (!this.editMode) {
      this.productService.addProduct(this.currentCategory.id, this.productForm.value)
        .then(res => {
          this.isFormSaved = true;
          this.appErrService.handleSuccess({ subject: productName, message: 'is added successfully.' });
          this.router.navigate(['../'], { relativeTo: this.route });
        })
        .catch(err => {
          this.appErrService.handleError({ subject: '', message: err.code });
        });
    } else {
      this.productService.updateProduct(this.currentCategory.id, this.productService.currentProduct.id, this.productForm.value)
        .then(res => {
          this.isFormSaved = true;
          this.appErrService.handleSuccess({ subject: productName, message: 'is updated successfully.' });
          this.router.navigate(['../'], { relativeTo: this.route });
        })
        .catch(err => {
          this.appErrService.handleError({ subject: '', message: err.code });
        });
    }

    this.productForm.reset();
  }

  canDeactivate() {
    if (this.productForm.dirty && !this.isFormSaved) {
      return confirm('Are you sure, want to continue with unsaved changes?');
    }
    return true;
  }

}
