import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdPartyProductComponent } from './third-party-product.component';

describe('ThirdPartyProductComponent', () => {
  let component: ThirdPartyProductComponent;
  let fixture: ComponentFixture<ThirdPartyProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdPartyProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdPartyProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
