import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../data/review';
import { ReviewStatus } from '../data/review-status';
import { NewReview } from '../data/new-review';
import { ReviewComment } from '../data/review-comment';
import { NewReviewComment } from '../data/new-review-comment';
import { Category } from '../data/category';
import { SubCategory } from '../data/subcategory';
import { Severity } from '../data/severity';
import { ClosureStatus } from '../data/closure-status';
import { Disposition } from '../data/disposition';
import { UpdateToReviewComment } from '../data/update-review-comment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviewsCreatedByUserId(id: number): Observable<Review[]> {
    return this.http.get<Review[]>('/acreview/reviews/dev/' + id);
  }
  getReviewsAssignedToUserId(id: number): Observable<Review[]> {
    return this.http.get<Review[]>('/acreview/reviews/assign/' + id);
  }
  getReviewStatusList(): Observable<ReviewStatus[]> {
    return this.http.get<ReviewStatus[]>('/acreview/reviewstatus');
  }

  createNewReview(newReview: NewReview): Observable<Review> {
    return this.http.post<Review>('/acreview/reviews/', newReview);
  }
  uploadFiles(formData: FormData, reviewId: number) {
    return this.http.post('/acreview/upload/' + reviewId, formData);
  }
  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>('/acreview/reviews/');
  }
  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>('/acreview/reviews/' + id);
  }
  assignReviewer(reviewId: number, reviewerId: number) {
    return this.http.put('/acreview/reviews/' + reviewId, {
      reviewer: reviewerId,
      mode: 'ASSIGN_REVIEWER'
    });
  }
  sendReviewToDeveloper(reviewId: number, reviewerId: number) {
    return this.http.put('/acreview/reviews/' + reviewId, {
      reviewer: reviewerId,
      mode: 'DEVELOPER_REVIEW'
    });
  }
  closeReview(reviewId: number, reviewerId: number) {
    return this.http.put('/acreview/reviews/' + reviewId, {
      reviewer: reviewerId,
      mode: 'CLOSE_REVIEW'
    });
  }
  reOpenReview(reviewId: number, reviewerId: number) {
    return this.http.put('/acreview/reviews/' + reviewId, {
      reviewer: reviewerId,
      mode: 'REOPEN'
    });
  }
  downloadFileByReviewId(reviewId: number): Observable<Blob> {
    return this.http.get('/acreview/download/' + reviewId, {responseType: 'blob'});
  }
  getReviewComments(reviewId: number): Observable<ReviewComment[]> {
    return this.http.get<ReviewComment[]>('/acreview/reviewcomments/review/' + reviewId);
  }
  getReviewCommentById(commentId: number): Observable<ReviewComment> {
    return this.http.get<ReviewComment>('/acreview/reviewcomments/' + commentId);
  }
  addCommentToReview(newReviewComment: NewReviewComment, reviewId: number): Observable<ReviewComment> {
    return this.http.post<ReviewComment>('/acreview/reviewcomments/review/' + reviewId, newReviewComment);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/acreview/categories/');
  }
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>('/acreview/categories/' + id);
  }
  getSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>('/acreview/subcategories/');
  }
  getSubCategoriesByCategoryId(id: number): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>('/acreview/subcategories/category/' + id);
  }
  getSeverities(): Observable<Severity[]> {
    return this.http.get<Severity[]>('/acreview/severity/');
  }
  getSeverityById(id: number): Observable<Severity> {
    return this.http.get<Severity>('/acreview/severity/' + id);
  }
  getClosureStatus(): Observable<ClosureStatus[]> {
    return this.http.get<ClosureStatus[]>('acreview/closurestatus/');
  }
  getClosureStatusById(id: number): Observable<ClosureStatus> {
    return this.http.get<ClosureStatus>('/acreview/closurestatus/' + id);
  }
  getDisposition(): Observable<Disposition[]> {
    return this.http.get<Disposition[]>('/acreview/disposition/');
  }
  getDispositionById(id: number): Observable<Disposition> {
    return this.http.get<Disposition>('/acreview/disposition/' + id);
  }
  updateReviewComment(commentId: number, updateToComment: UpdateToReviewComment) {
    return this.http.put('/acreview/reviewcomments/' + commentId, updateToComment);
  }
}
