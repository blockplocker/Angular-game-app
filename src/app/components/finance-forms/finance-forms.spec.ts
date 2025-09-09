import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceForms } from './finance-forms';

describe('FinanceForms', () => {
  let component: FinanceForms;
  let fixture: ComponentFixture<FinanceForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceForms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceForms);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
