import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../service/admin/admin.service';
import { TourService } from '../service/tour/tour.service';
import { addTourDetails } from '../interface/addTour';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css'],
})
export class AdminhomeComponent {
  tours: addTourDetails[] = [];
  tour: any;

  updatedTour: any;
  tourForm!: FormGroup;

  constructor(
    private router: Router,
    private tourService: TourService,
    private fb: FormBuilder
  ) {
    this.tourForm = this.fb.group({
      tourName: ['', Validators.required],
      tourDescription: ['', Validators.required],
      tourPrice: [0, Validators.required],
      tourStartDate: ['', Validators.required],
      tourEndDateName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fetchAllTours();
  }
  //LOGOUT
  logOut() {
    localStorage.clear();

    this.router.navigate(['/login']);
  }

  fetchAllTours() {
    this.tourService.fetchAllTours()?.subscribe((response: any) => {
      // console.log(response);
      this.tours = response;
      console.log(this.tours);
    });
  }

  deleteTour(tourID: string) {
    this.tourService.deleteTour(tourID).subscribe(
      (response: any) => {
        console.log(response);
        this.fetchAllTours();
      },
      (error: Error) => {
        console.log(error);
      }
    );
  }

  //UPDATE TOUR
  showForm = false;

  updateTour(tourID: string) {
    const selectedTour = this.tours.find((tour) => tour.tourID === tourID);
    console.log(selectedTour);
    if (selectedTour) {
      this.updatedTour = selectedTour;
      this.showForm = true;
    }
  }

  hideForm() {
    this.showForm = false;
  }

  saveChanges() {
    if (this.tourForm.valid) {
      if (this.updatedTour) {
        this.tourService.updateTour(this.updatedTour).subscribe(
          (response: any) => {
            console.log(response);
            this.fetchAllTours(); // Refresh the tour list after updating
          },
          (error: Error) => {
            console.log(error);
          }
        );
         this.hideForm();
      }
    }
    else {
      console.log('Form is not valid. Cannot save changes.');
    }
  }
}
