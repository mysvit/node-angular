import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommentsFormComponent } from './home-comments-form.component';

describe('HomeCommentsFormComponent', () => {
  let component: HomeCommentsFormComponent;
  let fixture: ComponentFixture<HomeCommentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCommentsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCommentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
