import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewReview } from '../data/new-review';
import { User } from '../data/user';
import { ReviewsService } from '../services/reviews.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {
  newReview: NewReview = {
    review_name: '',
    project_name: '',
    lines_of_code: 0,
    developer: 0,
    review_details: ''
  };
  user: User = {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    groups: null
  };
  filesForUpload: File[];
  constructor(private userService: UserService, private reviewService: ReviewsService) { }

  ngOnInit() {
    /*this.user.email = this.userService.getUserEmail();
    this.userService.getUserByEmail(this.user.email)
                       .subscribe((resp: User) => this.user = this.userService.setUser(resp));*/
    this.user = this.userService.getUser();
  }


  onSubmit(form: NgForm) {

  }
  fileChange(element) {
    this.filesForUpload = element.target.files;
  // console.log(this.filesForUpload);
  }

  createReview() {
    this.newReview.developer = this.user.id;
    this.reviewService.createNewReview(this.newReview).subscribe(resp => this.fileUpload(resp.id));
  }
  fileUpload(reviewId: number) {
    const formData = new FormData();
    formData.append('review_ref', reviewId.toString());
    for (const file of this.filesForUpload) {
      formData.append('file', file, file.name);
    }
    // console.log(formData);
    // console.log(this.filesForUpload);
    this.reviewService.uploadFiles(formData, reviewId)
                      .subscribe(resp =>  console.log(JSON.stringify(resp)));
  }

}
