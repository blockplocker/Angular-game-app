import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Discussly } from './discussly';

describe('Discussly', () => {
  let component: Discussly;
  let fixture: ComponentFixture<Discussly>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Discussly]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Discussly);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
