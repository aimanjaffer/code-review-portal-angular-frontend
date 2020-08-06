import { Component, OnInit } from '@angular/core';
import { Review } from '../data/review';
import { User } from '../data/user';
import { UserService } from '../services/user.service';
import { ReviewsService } from '../services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewComment } from '../data/review-comment';
import { NgForm } from '@angular/forms';
import { NewReviewComment } from '../data/new-review-comment';
import { Category } from '../data/category';
import { SubCategory } from '../data/subcategory';
import { Severity } from '../data/severity';
import { ReviewCommentReadable } from '../data/review-comment-readable';
import { Disposition } from '../data/disposition';
import { ClosureStatus } from '../data/closure-status';

@Component({
  selector: 'app-assigned-review',
  templateUrl: './assigned-review.component.html',
  styleUrls: ['./assigned-review.component.css']
})
export class AssignedReviewComponent implements OnInit {
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
  newComment: NewReviewComment = {} as NewReviewComment;
  reviewComments: ReviewComment[] = null;
  reviewCommentsReadable: ReviewCommentReadable[] = new Array<ReviewCommentReadable>();
  categoryList: Category[] = null;
  subCategoryList: SubCategory[] = null;
  severityName = '';
  constructor(private userService: UserService, private reviewService: ReviewsService, private route: ActivatedRoute) { }

  ngOnInit() {
    /*
    this.user.email = this.userService.getUserEmail();
    this.userService.getUserByEmail(this.user.email)
    .subscribe((resp: User) => this.user = this.userService.setUser(resp));
    */
    this.user = this.userService.getUser();

    this.route.params.subscribe(params => {
      this.reviewService.getReviewById(params.id).subscribe((review: Review) => {
        this.review = review;
        this.reviewService.getReviewComments(this.review.id).subscribe((resp: ReviewComment[]) => this.onSuccessfulGettingComments(resp));
      });
    });
    this.reviewService.getCategories()
    .subscribe((resp: Category[]) => {
      this.categoryList = resp;
    });
  }


  onSuccessfulGettingComments(resp: ReviewComment[]) {
    this.reviewComments = resp;
    for (const comment of resp) {
      this.addCommentToReadableList(comment);
    }
  }

  download() {
    this.reviewService.downloadFileByReviewId(this.review.id)
    .subscribe((response: Blob) => this.downloadFile(response));
  }
  categoryChanged() {
    this.reviewService.getSubCategoriesByCategoryId(this.newComment.category)
    .subscribe((resp: SubCategory[]) => {
      this.subCategoryList = resp;
      this.newComment.sub_category = null;
    });
  }
  subcategoryChanged() {
    const subcategory = this.subCategoryList.find((e) => {
      return e.id === this.newComment.sub_category;
    });
    this.newComment.severity = subcategory.severity_ref;
    this.reviewService.getSeverityById(this.newComment.severity).subscribe((resp: Severity) => this.severityName = resp.severity_name);
  }
  downloadFile(data: Blob) {
    const blob = new Blob([data]);
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = 'Code_Review_' + this.review.review_name + '_' + this.review.project_name + '.zip';
    anchor.href = url;
    anchor.click();
  }
  onSubmit(form: NgForm) {
    form.resetForm();
  }
  addComment() {
    this.newComment.review_ref = this.review.id;
    this.reviewService.addCommentToReview(this.newComment, this.review.id)
    .subscribe((postedComment: ReviewComment) => {
      console.log('after posting comment' + JSON.stringify(postedComment));
      this.newComment = {} as NewReviewComment;
      this.reviewComments.push(postedComment);
      this.addCommentToReadableList(postedComment);
    });
  }
  addCommentToReadableList(comment: ReviewComment) {
    const commentReadable: ReviewCommentReadable = {} as ReviewCommentReadable;
    commentReadable.id = comment.id;
    commentReadable.review_ref = comment.review_ref;
    commentReadable.comment = comment.comment;
    commentReadable.file_name = comment.file_name;
    this.reviewService.getCategoryById(comment.category)
    .subscribe((cat: Category) => {
      commentReadable.category = cat.category_name;
      this.reviewService.getSubCategoriesByCategoryId(cat.id)
      .subscribe((subCat: SubCategory[]) => {
        const subCatArray = subCat.find((e) => {
          return e.id === comment.sub_category;
        });
        commentReadable.sub_category = subCatArray.sub_category_name;
      });
    });
    this.reviewService.getSeverityById(comment.severity)
    .subscribe((sev: Severity) => commentReadable.severity = sev.severity_name);
    if (comment.disposition != null) {
      this.reviewService.getDispositionById(comment.disposition)
      .subscribe((d: Disposition) => commentReadable.disposition = d.disposition_name);
    } else {
      commentReadable.disposition = '';
    }
    commentReadable.action_taken = comment.action_taken;
    if (comment.closure_status != null) {
      this.reviewService.getClosureStatusById(comment.closure_status)
      .subscribe((cs: ClosureStatus) => commentReadable.closure_status = cs.status_name);
    } else {
      commentReadable.closure_status = '';
    }
    commentReadable.comment_date = comment.comment_date;
    this.reviewCommentsReadable.push(commentReadable);
  }


  sendToDeveloper() {
    this.reviewService.sendReviewToDeveloper(this.review.id, this.review.reviewer)
    .subscribe((result) => console.log(result));
  }

  closeReview() {
    this.reviewService.closeReview(this.review.id, this.review.reviewer).subscribe();
  }
}
