import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { addReviewDetails } from 'src/app/interface/reviews';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  fetchAllReviews() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get(
        'http://localhost:4520/review/getallreviews',
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
  //DELETE REVIEWS
  deleteReview(reviewID: string) {
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
      `http://localhost:4520/review/deletereview/${reviewID}`,
      options
    );
  }
  //ADD REVIEWS
  async addReview(reviewDetails: addReviewDetails) {
    try {
      let response = await fetch('', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(reviewDetails),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.log('In review service, you have the error', error);
    }
  }
}

