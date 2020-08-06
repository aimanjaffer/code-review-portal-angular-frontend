import { Component, OnInit } from '@angular/core';
import { User } from '../data/user';
import { ReviewReadable } from '../data/review-readable';
import { UserService } from '../services/user.service';
import { ReviewsService } from '../services/reviews.service';
import { Review } from '../data/review';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css']
})
export class ViewReviewsComponent implements OnInit {
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    groups: null
  };
  reviewsReadableAssignedTo: Array<ReviewReadable> = [];
  reviewsReadableCreatedBy: Array<ReviewReadable> = [];
  unassignedReviews: Array<ReviewReadable> = [];
  reviewStatusMap: Map<number, string> = null;
  constructor(private userService: UserService, private reviewsService: ReviewsService) { }

  ngOnInit() {
    this.reviewsService.getReviewStatusList()
                       .subscribe(response => {
                          this.reviewStatusMap = new Map(response.map(i => [i.id, i.status_value]));
                          this.user.email = this.userService.getUserEmail();
                          this.userService.getUserByEmail(this.user.email)
                                          .subscribe((resp: User) => {
                                            this.onSuccessGettingUserByEmail(resp);
                                          });
                        });
  }

  onSuccessGettingUserByEmail(resp: User) {
    this.user = this.userService.setUser(resp);
    this.userService.addUserToMap(resp);
    this.getAllUnassignedReviews();
    this.reviewsService.getReviewsCreatedByUserId(this.user.id)
    .subscribe((res: Review[]) => this.onSuccessGettingReviewsCreatedByUser(res));

    this.reviewsService.getReviewsAssignedToUserId(this.user.id)
    .subscribe((res: Review[]) => this.onSuccessGettingReviewsAssignedToUser(res));
  }

  onSuccessGettingReviewsCreatedByUser(res: Review[]) {
    for (const review of res) {
      const reviewReadable: ReviewReadable = {} as ReviewReadable;
      reviewReadable.id = review.id;
      reviewReadable.review_name = review.review_name;
      reviewReadable.date_of_closing = review.date_of_closing;
      reviewReadable.date_of_submission = review.date_of_submission;
      reviewReadable.lines_of_code = review.lines_of_code;
      reviewReadable.project_name = review.project_name;
      reviewReadable.status = this.reviewStatusMap.get(review.status);
      reviewReadable.review_details = review.review_details;
      if (review.developer != null) {
        this.userService.getUserFromID(review.developer)
        .subscribe((user: User) => {
          reviewReadable.developer = user.first_name + ' ' + user.last_name;
          this.userService.addUserToMap(user);
        },
        (err) => console.log(err),
        () => {
          if (!this.reviewsReadableCreatedBy.includes(reviewReadable)) {
          this.reviewsReadableCreatedBy.push(reviewReadable);
          }
        });
      }
      if (review.reviewer != null) {
          this.userService.getUserFromID(review.reviewer)
          .subscribe((user: User) => {
            reviewReadable.reviewer = user.first_name + ' ' + user.last_name;
            this.userService.addUserToMap(user);
          },
          (err) => console.log(err),
          () => {
            if (!this.reviewsReadableCreatedBy.includes(reviewReadable)) {
              this.reviewsReadableCreatedBy.push(reviewReadable);
            }
          });
      }
  }
}
  onSuccessGettingReviewsAssignedToUser(res: Review[]) {
    for ( const review of res) {
      const reviewReadable: ReviewReadable = {} as ReviewReadable;
      reviewReadable.id = review.id;
      reviewReadable.review_name = review.review_name;
      reviewReadable.date_of_closing = review.date_of_closing;
      reviewReadable.date_of_submission = review.date_of_submission;
      reviewReadable.lines_of_code = review.lines_of_code;
      reviewReadable.project_name = review.project_name;
      reviewReadable.status = this.reviewStatusMap.get(review.status);
      reviewReadable.review_details = review.review_details;
      if (review.developer != null) {
        this.userService.getUserFromID(review.developer)
        .subscribe((user: User) => {
          reviewReadable.developer = user.first_name + ' ' + user.last_name;
          this.userService.addUserToMap(user);
        },
        (err) => console.log(err),
        () => {
        if (!this.reviewsReadableAssignedTo.includes(reviewReadable)) {
          this.reviewsReadableAssignedTo.push(reviewReadable);
        }
        });
      }
      if (review.reviewer != null) {
          this.userService.getUserFromID(review.reviewer)
          .subscribe((user: User) => {
            reviewReadable.reviewer = user.first_name + ' ' + user.last_name;
            this.userService.addUserToMap(user);
          },
          (err) => console.log(err),
          () => {
            if (!this.reviewsReadableAssignedTo.includes(reviewReadable)) {
              this.reviewsReadableAssignedTo.push(reviewReadable);
            }
          });
      }
    }
  }




  getAllUnassignedReviews() {
    if (this.userService.isAdmin()) {
      this.reviewsService.getAllReviews().subscribe((res: Review[]) => this.onSuccessfulGettingAllReviews(res));
    }
  }


  onSuccessfulGettingAllReviews(reviews: Review[]) {
    for (const review of reviews) {
      const reviewReadable: ReviewReadable = {} as ReviewReadable;
      reviewReadable.id = review.id;
      reviewReadable.review_name = review.review_name;
      reviewReadable.date_of_closing = review.date_of_closing;
      reviewReadable.date_of_submission = review.date_of_submission;
      reviewReadable.lines_of_code = review.lines_of_code;
      reviewReadable.project_name = review.project_name;
      reviewReadable.status = this.reviewStatusMap.get(review.status);
      reviewReadable.review_details = review.review_details;
      if (reviewReadable.status !== 'New') {
        continue;
      }
      if (review.developer != null) {
        this.userService.getUserFromID(review.developer)
        .subscribe((user: User) => {
          reviewReadable.developer = user.first_name + ' ' + user.last_name;
          this.userService.addUserToMap(user);
        },
        (err) => console.log(err),
        () => {
        if (!this.unassignedReviews.includes(reviewReadable)) {
          this.unassignedReviews.push(reviewReadable);
        }
        });
      }
    }
  }
}
