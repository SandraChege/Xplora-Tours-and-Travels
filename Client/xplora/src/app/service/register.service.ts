import { Injectable } from '@angular/core';
import { UserDetails } from '../interface/register';
import { loginUserDetails } from '../interface/loginuserDetails';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() {}

  async registerNewUser(userdetail: UserDetails) {
    let response = await fetch('http://localhost:4520/user/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(userdetail),
    });

    const data = await response.json();

    console.log(data);

    return data;
  }

  async loginregistereduser(logindata: loginUserDetails) {
    // let body = {email, password}
    let res = await fetch('http://localhost:4520/user/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(logindata),
    });

    let data = await res.json();

    console.log(data);
    return data;
  }

  async checkuserdetails() {
    let token = localStorage.getItem('token');

    let res = await fetch('http://localhost:4520/user/checkuserdetails', {
      headers: {
        'Content-Type': 'application/json',
        token: `${token}`,
      },
      method: 'GET',
    });

    let data = await res.json();

    console.log(data);
    return data;
  }
}
