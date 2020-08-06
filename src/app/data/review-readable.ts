export interface ReviewReadable {
    id: number;
    review_name: string;
    project_name: string;
    lines_of_code: number;
    developer: string;
    status: string;
    reviewer: string;
    date_of_closing: Date;
    date_of_submission: Date;
    review_details: string;
}
