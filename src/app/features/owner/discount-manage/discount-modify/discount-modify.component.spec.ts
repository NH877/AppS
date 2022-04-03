import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountModifyComponent } from './discount-modify.component';

describe('DiscountModifyComponent', () => {
  let component: DiscountModifyComponent;
  let fixture: ComponentFixture<DiscountModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
