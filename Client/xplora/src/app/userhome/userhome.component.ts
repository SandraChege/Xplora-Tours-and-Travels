import { Component } from '@angular/core';
import { TourService } from '../service/tour/tour.service';
import { addTourDetails } from '../interface/addTour';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { BookingsService } from '../service/booking/bookings.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
})
export class UserhomeComponent {
  tours: addTourDetails[] = []; //used withfetchAllTours
  bookForm!: FormGroup;
  userDetails!: any; //used with getuserDetails
  userBookings: any[] = [];
  // userID: string = '';

  constructor(
    private tourService: TourService,
    private userService: UserService,
    private bookingservice: BookingsService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      totalBookCount: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchAllTours();
    this.getUserDetails();
    this.fetchUserBookings();
  }

  //FETCH ALL TOURS
  fetchAllTours() {
    this.tourService.fetchAllTours()?.subscribe((response: any) => {
      console.log(response);
      this.tours = response;
      //console.log(this.tours);
    });
  }

  //BOOK TOUR
  showForm = false;

  hideForm() {
    this.showForm = false;
  }

  bookTour(tourID: string) {
    this.showForm = true;
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

  saveChanges() {
    const { totalBookCount } = this.bookForm.value;
    const userID = localStorage.getItem('userID');
    const tourID = localStorage.getItem('tourID');
    const price: any = this.tours.find(
      (tour) => tour.tourID === tourID
    )?.tourPrice;
    console.log(userID, tourID);

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
    const totalprice: any = price * totalBookCount;

    this.bookingservice
      .addNewBooking({ userID, tourID, totalBookCount, totalprice })
      .then(
        (response) => {
          console.log(response);
          this.hideForm();
        },
        (error) => {
          console.log(error);
        }
      );
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
}
