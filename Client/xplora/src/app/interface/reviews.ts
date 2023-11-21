export interface allReviews {
  reviewID: string;
  reviewContent: string;
  isDeleted: boolean;
  tourID: string;
  userID: string;
}

export interface addReviewDetails {
  tourID: string;
  userID: string;
  reviewContent: string;
}
