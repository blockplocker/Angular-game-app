import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderModal } from './calender-modal';

describe('CalenderModal', () => {
  let component: CalenderModal;
  let fixture: ComponentFixture<CalenderModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalenderModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalenderModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
