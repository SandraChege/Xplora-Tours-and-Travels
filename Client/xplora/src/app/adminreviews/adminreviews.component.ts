import { Component } from '@angular/core';
import { ReviewService } from '../service/review/review.service';
import { allReviews } from 'src/app/interface/reviews';
import { TourService } from '../service/tour/tour.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-adminreviews',
  templateUrl: './adminreviews.component.html',
  styleUrls: ['./adminreviews.component.css'],
})
export class AdminreviewsComponent {
  review: allReviews[] = [];
  userName: string = '';
  tourName: string = '';
  tourType: string = '';

  constructor(
    private reviewservice: ReviewService,
    private tourservice: TourService,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.fetchAllReviews();
  }
  //FETCH ALL REVIEWS
  fetchAllReviews() {
    this.reviewservice.fetchAllReviews()?.subscribe((response: any) => {
      console.log(response);
      this.review = response;

      //const firstReview = this.review[0];

      // Fetch user details
      // this.userservice.getUserByEmail(firstReview.userID).subscribe((user: any) => {
      //   if (user && user.user) {
      //     this.userName = user.user[0].username;
      //   }
      // });

      // this.tourservice.getTourByID(firstReview.tourID).subscribe((tour: any) => {
      //   console.log(tour);

      //     if (tour) {
      //       this.tourName = tour.tourName;
      //       this.tourType = tour.tourType;
      //     }
      // });
    });
  }

  //DELETE REVIEW
  deleteReview(reviewID: string) {
    this.reviewservice.deleteReview(reviewID).subscribe(
      (response: any) => {
        console.log(response);
        this.fetchAllReviews();
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }
}
