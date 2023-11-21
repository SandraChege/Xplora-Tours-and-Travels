import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TourService } from '../service/tour/tour.service';
import { addTourDetails } from 'src/app/interface/addTour';

@Component({
  selector: 'app-alldestinations',
  templateUrl: './alldestinations.component.html',
  styleUrls: ['./alldestinations.component.css'],
})
export class AlldestinationsComponent {
  addTourForm!: FormGroup;
  constructor( private tourservice: TourService) {
    this.addTourForm = new FormGroup({
      imageUrl: new FormControl('', Validators.required),
      tourName: new FormControl('', Validators.required),
      tourDescription: new FormControl('', Validators.required),
      tourPrice: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      tourStartDate: new FormControl('', Validators.required),
      tourEndDateName: new FormControl('', Validators.required),
      tourCount: new FormControl('', Validators.required),
    });
  }

  addNewTour() {
    if (this.addTourForm.valid) {
      
      const currentDate = new Date();
      const startDate = new Date(this.addTourForm.value.tourStartDate);
      if (startDate < currentDate) {
        console.log('Start date cannot be in the past');
        return;
      }
      console.log("hello");
      
      this.tourservice.addNewTour(this.addTourForm.value).then(
        (data: addTourDetails) => {
          console.log('Tour added successfully:', data);
          this.addTourForm.reset();
        },
        (err: Error) => {
          console.log(err);
        }
      );
    }
  }
}
