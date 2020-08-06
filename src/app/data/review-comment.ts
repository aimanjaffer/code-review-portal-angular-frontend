export interface ReviewComment {
    id: number;
    review_ref: number;
    comment: string;
    file_name: string;
    category: number;
    sub_category: number;
    severity: number;
    disposition: number;
    action_taken: string;
    closure_status: number;
    comment_date: Date;
}
