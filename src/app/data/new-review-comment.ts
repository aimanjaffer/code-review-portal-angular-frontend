export interface NewReviewComment {
    review_ref: number;
    comment: string;
    file_name: string;
    category: number;
    sub_category: number;
    severity: number;
}
