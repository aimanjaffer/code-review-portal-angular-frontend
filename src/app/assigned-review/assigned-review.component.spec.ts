import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedReviewComponent } from './assigned-review.component';

describe('AssignedReviewComponent', () => {
  let component: AssignedReviewComponent;
  let fixture: ComponentFixture<AssignedReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
