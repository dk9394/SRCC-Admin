import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsLandingComponent } from './products-landing.component';

describe('ProductsLandingComponent', () => {
  let component: ProductsLandingComponent;
  let fixture: ComponentFixture<ProductsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
