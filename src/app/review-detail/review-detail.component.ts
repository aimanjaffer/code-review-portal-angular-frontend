import { Component, OnInit } from '@angular/core';
import { Review } from '../data/review';
import { User } from '../data/user';
import { UserService } from '../services/user.service';
import { ReviewsService } from '../services/reviews.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewComment } from '../data/review-comment';
import { ReviewCommentReadable } from '../data/review-comment-readable';
import { Category } from '../data/category';
import { SubCategory } from '../data/subcategory';
import { Severity } from '../data/severity';
import { Disposition } from '../data/disposition';
import { ClosureStatus } from '../data/closure-status';
import { NgForm } from '@angular/forms';
import { UpdateToReviewComment } from '../data/update-review-comment';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
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
  reviewCommentForUpdate: UpdateToReviewComment = {} as UpdateToReviewComment;
  idOfCommentForUpdate: number;
  reviewComments: ReviewComment[] = null;
  reviewCommentsReadable: ReviewCommentReadable[] = new Array<ReviewCommentReadable>();
  categoryList: Category[] = null;
  subCategoryList: SubCategory[] = null;
  severityName = '';
  commentIDList: number[] = new Array<number>();
  dispositionList: Disposition[] = null;
  closureStatusList: ClosureStatus[] = null;

  constructor(private userService: UserService, private reviewService: ReviewsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.route.params.subscribe(params => {
      this.reviewService.getReviewById(params.id).subscribe((review: Review) => {
        this.review = review;
        this.loadComments();
      });
    });
    this.reviewService.getCategories()
    .subscribe((resp: Category[]) => {
      this.categoryList = resp;
    });
    this.reviewService.getDisposition().subscribe(resp => this.dispositionList = resp);
    this.reviewService.getClosureStatus().subscribe(resp => this.closureStatusList = resp);
  }

  loadComments() {
    this.reviewService.getReviewComments(this.review.id)
    .subscribe((resp: ReviewComment[]) => this.onSuccessfulGettingComments(resp));
  }

  onSuccessfulGettingComments(resp: ReviewComment[]) {
    this.reviewComments = resp;
    this.reviewCommentsReadable = [];
    for (const comment of resp) {
      this.addCommentToReadableList(comment);
    }
  }

  addCommentToReadableList(comment: ReviewComment) {
    const commentReadable: ReviewCommentReadable = {} as ReviewCommentReadable;
    commentReadable.id = comment.id;
    if (!this.commentIDList.includes(comment.id)) {
      this.commentIDList.push(comment.id);
    }
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

  download() {
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

  commentIDChanged() {
    console.log(this.idOfCommentForUpdate);
  }

  onSubmit(form: NgForm) {
    this.reviewService.updateReviewComment(this.idOfCommentForUpdate, this.reviewCommentForUpdate)
    .subscribe(resp => {
      console.log(resp);
      this.idOfCommentForUpdate = null;
      this.reviewCommentForUpdate = {} as UpdateToReviewComment;
      form.resetForm();
      // TODO: Update only that one comment instead of reloading all comments
      this.loadComments();
    });
  }

  sendToReviewer() {
    this.reviewService.assignReviewer(this.review.id, this.review.reviewer)
    .subscribe((resp) => console.log(resp));
  }

}
