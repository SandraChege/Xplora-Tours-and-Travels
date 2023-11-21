import { Component } from '@angular/core';
import { Modal, Ripple, initTE, Tab, Input } from 'tw-elements';
import { AdminService } from '../service/admin/admin.service';
import { allbookings } from '../interface/allbookings';

@Component({
  selector: 'app-adminbookings',
  templateUrl: './adminbookings.component.html',
  styleUrls: ['./adminbookings.component.css'],
})
export class AdminbookingsComponent {
  ngOnIt() {
    initTE({ Modal, Ripple, Tab, Input });
  }
  allbookings: allbookings[] = [];
  constructor(private adminservice: AdminService) {}

  ngOnInit() {
    this.getAllBookings();
  }
  //GET ALL BOOKINGS
  getAllBookings() {
    this.adminservice.getAllBookings()?.subscribe((response: any) => {
      console.log(response);
      this.allbookings = response;
    });
  }

  //DELETE BOOKING
  deleteBooking(bookID: string) {
    this.adminservice.deleteBooking(bookID).subscribe(
      (response: any) => {
        console.log(response);
        this.getAllBookings();
      },
       (error: Error) => {
        console.log(error);
      }
    )
  }
}
