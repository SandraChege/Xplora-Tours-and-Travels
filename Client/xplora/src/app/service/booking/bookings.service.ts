import { Injectable } from '@angular/core';
import { bookingDetails, updatebookingDetails } from 'src/app/interface/allbookings';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor() {}

  async addNewBooking(bookingdetail: bookingDetails) {
    try {
      let response = await fetch('http://localhost:4520/booking/addbooking', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(bookingdetail),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('In tour service, you have the error', error);
    }
  }

  //DELETE BOOKING
  async deleteBooking(bookID: string) {
    try {
      const response = await fetch(
        `http://localhost:4520/booking/deletebooking/${bookID}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        console.error(
          'Server responded with an error:',
          response.status,
          response.statusText
        );
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log('In bookings service, you have the error', error);
      return null;
    }
  }

  //GET USER BOOKING
  async getUserBookings(userID: string) {
    try {
      const token = localStorage.getItem('token');

      //check if token exists
      if (!token) {
        console.error('Token is missing');
        return null;
      }

      let response = await fetch(
        'http://localhost:4520/booking/getallbookings',
        {
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          method: 'GET',
        }
      );
      //console.log(response);

      if (!response.ok) {
        console.error(
          'Server responded with an error:',
          response.status,
          response.statusText
        );
        return null;
      }

      const data = await response.json();
      // Filter bookings based on the specific user's userID
      const userBookings = data.filter(
        (booking: any) => booking.userID === userID
      );

      const bookingsWithTourDetails = await Promise.all(
        userBookings.map(async (booking: any) => {
          const tourDetails = await this.getTourDetails(booking.tourID);
          return { ...booking, tourDetails: tourDetails || {} };
        })
      );

      return bookingsWithTourDetails;
      // return userBookings;
    } catch (error) {
      console.log('In tour service, you have the error', error);
      return null;
    }
  }

  async getTourDetails(tourID: string) {
    try {
      let response = await fetch(
        `http://localhost:4520/tour/gettour?tourID=${tourID}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            tourID: tourID,
          }),
        }
      );
      if (!response.ok) {
        console.error(
          'Server responded with an error:',
          response.status,
          response.statusText
        );
        return null;
      }

      const tourDetails = await response.json();
      return tourDetails;
    } catch (error) {
      console.log('In bookings service, you have the error', error);
      return null;
    }
  }

  //UPDATE BOOKING
  async updateBooking(bookingdetail: updatebookingDetails) {
    try {
      let response = await fetch(
        'http://localhost:4520/booking/updatebooking',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PUT',
          body: JSON.stringify(bookingdetail),
        }
      );
      console.log(response);

      const data = await response.json();

      console.log('UpdateBooking server response:', data);

      return data;
    } catch (error) {
      console.log(error);
      console.log('In tour service, you have the error', error);
      return null;
    }
  }
}
