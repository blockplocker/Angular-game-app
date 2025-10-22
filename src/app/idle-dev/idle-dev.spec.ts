import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleDev } from './idle-dev';

describe('IdleDev', () => {
  let component: IdleDev;
  let fixture: ComponentFixture<IdleDev>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdleDev]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdleDev);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
