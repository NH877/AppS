import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMultiSelectorComponent } from './product-multi-selector.component';

describe('ProductMultiSelectorComponent', () => {
  let component: ProductMultiSelectorComponent;
  let fixture: ComponentFixture<ProductMultiSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMultiSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMultiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
