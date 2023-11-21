import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { addTourDetails } from 'src/app/interface/addTour';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) {}

  //CREATE TOUR
  async addNewTour(projectdetail: addTourDetails) {
    try {
      let response = await fetch('http://localhost:4520/tour/addtour', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(projectdetail),
      });

      const data = await response.json();

      console.log(data);

      return data;
    } catch (error) {
      console.log('In tour service, you have the error', error);
    }
  }

  //DISPLAY ALL TOURS
  fetchAllTours() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get('http://localhost:4520/tour/getalltours', {
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

  //UPDATE TOURS
  updateTour(tour: addTourDetails) {
    return this.http.put('http://localhost:4520/tour/updatetour', tour);
  }

  //DELETE TOURS
  deleteTour(tourID: string) {
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
      `http://localhost:4520/tour/deletetour/${tourID}`,
      options
    );
  }

  //GET ONE TOUR BY ID
  getTourByID(tourID: string) {
    const params = { tourID };
    const url = 'http://localhost:4520/tour/gettour'
    return this.http.get(url, {params})
  }
}
