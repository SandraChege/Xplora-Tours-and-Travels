import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingsService } from '../service/booking/bookings.service';
import { TourService } from '../service/tour/tour.service';
import { UserService } from '../service/user.service';
import { addTourDetails } from '../interface/addTour';
import { ReviewService } from '../service/review/review.service';

@Component({
  selector: 'app-userbookings',
  templateUrl: './userbookings.component.html',
  styleUrls: ['./userbookings.component.css'],
})
export class UserbookingsComponent {
  tours: addTourDetails[] = []; //used withfetchAllTours
  bookForm!: FormGroup;
  userDetails!: any;
  userBookings: any[] = [];
  // userID: string = '';
  bookFormUpdate!: FormGroup;
  reviewForm!: FormGroup;

  constructor(
    private tourService: TourService,
    private userService: UserService,
    private bookingservice: BookingsService,
    private reviewservice: ReviewService,
    private fb: FormBuilder
  ) {
    this.bookFormUpdate = this.fb.group({
      totalBookCount: ['', Validators.required],
    });

    this.reviewForm = this.fb.group({
      reviewContent: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUserDetails();
    this.fetchUserBookings();
    this.fetchAllTours();
  }

  bookTour(tourID: string) {
    localStorage.setItem('tourID', tourID);
  }

  //GET USERID
  getUserDetails() {
    this.userService.fetchuserProfile()?.subscribe((response: any) => {
      //console.log(response);
      this.userDetails = response;
      let USERID = this.userDetails.info.userID;

      localStorage.setItem('userID', USERID);
    });
  }

  //GET USER BOOKINGS
  fetchUserBookings() {
    const userID = localStorage.getItem('userID');

    if (!userID) {
      console.error('UserID is missing');
      return;
    }

    this.bookingservice.getUserBookings(userID).then(
      (response) => {
        // console.log(response);
        this.userBookings = response || [];
        console.log(this.userBookings);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //DELETE BOOKING
  async onDeleteButton(bookID: string) {
    try {
      console.log('Deleting booking for bookID:', bookID);
      const result = await this.bookingservice.deleteBooking(bookID);

      //  console.log('Delete result:', result);

      if (result) {
        // Assuming you have a method to refresh user bookings after deletion
        this.refreshUserBookings();
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  }

  private refreshUserBookings() {
    // console.log('Refreshing user bookings...');
    this.fetchUserBookings();
  }

  //UPDATE BOOKING
  fetchAllTours() {
    this.tourService.fetchAllTours()?.subscribe((response: any) => {
      //console.log(response);
      this.tours = response;
      console.log(this.tours);
    });
  }

  showForm = false;

  hideForm() {
    this.showForm = false;
  }
  updateBooking(bookID: string, tourID:string, tourPrice:string) {
    this.showForm = true;
    localStorage.setItem('bookID', bookID);
    localStorage.setItem('tourID', tourID);
    localStorage.setItem('tourPrice', tourPrice);
  }

  saveUpdates() {
    const { totalBookCount } = this.bookFormUpdate.value;

    const userID = localStorage.getItem('userID');
    const bookID = localStorage.getItem('bookID');
    const tourID = localStorage.getItem('tourID');
    const tourPrice = localStorage.getItem('tourPrice');
    console.log('userID is', userID);
    console.log('tourID is', tourID);
    console.log('bookID is', bookID);
    console.log('tourPrice is', tourPrice);

    // Check if tourID is available
    if (!tourID) {
      console.error('Tour ID is missing');
      return;
    }

    // Check if userID is available
    if (!userID) {
      console.error('User ID is missing');
      return;
    }

    if (!bookID) {
      console.error('book ID is missing');
      return;
    }
    if (!tourPrice) {
      console.error('tourPrice is missing');
      return;
    }
    console.log('tourPrice is', parseInt(tourPrice, 10));
    const totalprice = (parseInt(tourPrice, 10) * totalBookCount).toString();

    this.bookingservice
      .updateBooking({ userID, tourID, bookID, totalBookCount, totalprice })
      .then(
        (response) => {
          console.log(response);
          this.hideForm();
          this.fetchUserBookings();
        },
        (error) => {
          console.log(error);
        }
    );
  }

  //ADD REVIEWS
  currentDate = new Date();
  showreviewForm = false;

  showReviewForm() {
    this.showreviewForm = true;
  }
  hideReviewForm() {
    this.showreviewForm = false;
  }

  isReviewButtonActive(tourEndDate: string): boolean {
    const tourEndDateDate = new Date(tourEndDate);
    return this.currentDate >= tourEndDateDate;
  }

  // addReview(bookID: string)
  addReview(bookID: string) {
    const { reviewContent } = this.reviewForm.value;
    const userID = localStorage.getItem('userID');
    const tourID = localStorage.getItem('tourID');

    // Check if tourID is available
    if (!tourID) {
      console.error('Tour ID is missing');
      return;
    }

    // Check if userID is available
    if (!userID) {
      console.error('User ID is missing');
      return;
    }
    this.reviewservice.addReview({ userID, tourID, reviewContent }).then(
      (response) => {
        console.log(response);
        // Additional actions after submitting the review, if needed
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
