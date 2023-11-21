import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  //FETCH ALL USERS
  fetchAllUsers() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get('http://localhost:4520/user/getallusers', {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          token: token,
        }),
      });
      return response;
    } else {
      return null;
    }
  }

  //DELETE USER
  deleteuser(userID: string) {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (!token) {
      return throwError('User not authenticated');
    }

    const options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token: token,
      }),
    };

    return this.http.delete(
      `http://localhost:4520/user/deleteuser/${userID}`,
      options
    );
  }

  getAllBookings() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get(
        'http://localhost:4520/booking/getallbookings',
        {
          headers: new HttpHeaders({
            'Content-type': 'application/json',
            token: token,
          }),
        }
      );
      return response;
    } else {
      return null;
    }
  }

  deleteBooking(reviewID: string) {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
      return throwError('User not authenticated');
    }

    const options = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        token: token,
      }),
    };

    return this.http.delete(
      `http://localhost:4520/booking/deletebooking/${reviewID}`,
      options
    );
  }
}
