export interface Review {
    id: number;
    review_name: string;
    project_name: string;
    lines_of_code: number;
    developer: number;
    status: number;
    reviewer: number;
    date_of_closing: Date;
    date_of_submission: Date;
    review_details: string;
}
