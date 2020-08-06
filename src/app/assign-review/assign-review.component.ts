import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Review } from '../data/review';
import { User } from '../data/user';
import { UserService } from '../services/user.service';
import { ReviewsService } from '../services/reviews.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-review',
  templateUrl: './assign-review.component.html',
  styleUrls: ['./assign-review.component.css']
})
export class AssignReviewComponent implements OnInit {

  review: Review = {
    id: 0,
    status: 0,
    review_name: '',
    project_name: '',
    lines_of_code: 0,
    developer: 0,
    reviewer: 0,
    review_details: '',
    date_of_closing: null,
    date_of_submission: null
  };
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    groups: null
  };
  reviewerSelection = 0;
  reviewersList: Array<User> = null;
  constructor(private userService: UserService, private reviewService: ReviewsService, private route: ActivatedRoute) { }

  ngOnInit() {
    /*this.user.email = this.userService.getUserEmail();
    this.userService.getUserByEmail(this.user.email)
                    .subscribe((resp: User) => this.user = this.userService.setUser(resp));*/
    this.user = this.userService.getUser();

    this.route.params.subscribe(params => {
       this.reviewService.getReviewById(params.id).subscribe((review: Review) => this.review = review);
    });
    this.userService.getUsersByGroup('reviewer').subscribe((resp: User[]) => {
      this.reviewersList = resp;
      console.log(this.reviewersList);
    });
  }

  onSubmit(form: NgForm) {
    console.log('submit button clicked with Reviewer = ' + this.reviewerSelection);
    this.reviewService.assignReviewer(this.review.id, this.reviewerSelection ).subscribe(resp => console.log(resp));
  }

  download() {
    // console.log('download button clicked');
    this.reviewService.downloadFileByReviewId(this.review.id)
                      .subscribe((response: Blob) => this.downloadFile(response));
  }

  downloadFile(data: Blob) {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = 'Code_Review_' + this.review.review_name + '_' + this.review.project_name + '.zip';
    anchor.href = url;
    anchor.click();
  }
}
