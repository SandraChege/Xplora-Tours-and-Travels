import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4520/user';
  
  constructor(private http: HttpClient) {}

  fetchuserProfile() {
    const token = localStorage.getItem('token');
    //console.log(token);

    if (token) {
      let response = this.http.get(
        'http://localhost:4520/user/checkuserdetails',
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

  updateUserProfile(userData: any) {
    const updateUrl = `${this.apiUrl}/updateuser`;
    return this.http.put(updateUrl, userData);
  }
}
