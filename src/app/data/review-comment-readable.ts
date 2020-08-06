export interface ReviewCommentReadable {
    id: number;
    review_ref: number;
    comment: string;
    file_name: string;
    category: string;
    sub_category: string;
    severity: string;
    disposition: string;
    action_taken: string;
    closure_status: string;
    comment_date: Date;
}
