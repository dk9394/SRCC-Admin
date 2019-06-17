import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLandingComponent } from './sales-landing.component';

describe('SalesLandingComponent', () => {
  let component: SalesLandingComponent;
  let fixture: ComponentFixture<SalesLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
