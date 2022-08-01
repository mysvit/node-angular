import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupCompleteComponent } from './user-signup-complete.component';

describe('UserSignupCompleteComponent', () => {
  let component: UserSignupCompleteComponent;
  let fixture: ComponentFixture<UserSignupCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSignupCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSignupCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
