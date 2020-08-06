import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReviewComponent } from './assign-review.component';

describe('AssignReviewComponent', () => {
  let component: AssignReviewComponent;
  let fixture: ComponentFixture<AssignReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
