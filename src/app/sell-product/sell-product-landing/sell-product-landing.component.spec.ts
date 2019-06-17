import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProductLandingComponent } from './sell-product-landing.component';

describe('SellProductLandingComponent', () => {
  let component: SellProductLandingComponent;
  let fixture: ComponentFixture<SellProductLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellProductLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellProductLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
