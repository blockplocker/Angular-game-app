import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseListing } from './house-listing';

describe('HouseListing', () => {
  let component: HouseListing;
  let fixture: ComponentFixture<HouseListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
