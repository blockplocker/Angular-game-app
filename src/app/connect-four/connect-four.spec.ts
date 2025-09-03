import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectFour } from './connect-four';

describe('ConnectFour', () => {
  let component: ConnectFour;
  let fixture: ComponentFixture<ConnectFour>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectFour]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectFour);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
