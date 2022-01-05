import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserLogin, UserRegister } from '../utils/interfaces';
import { Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
  });
  options = { headers: this.headers };

  user: User = { userId: '', username: '' };
  constructor(private http: HttpClient, private router: Router) {}

  login(user: UserLogin) {
    this.http
      .post('http://localhost:4000/auth/login', user)
      .subscribe((res: any) => {
        try {
          this.user = res.user;
          localStorage.setItem('access_token', res.token);
          this.router.navigate(['home']);
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  register(newUser: UserRegister) {
    this.http
      .post('http://localhost:4000/auth/register', newUser)
      .subscribe((res) => {
        try {
          console.log(res);
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  sendEmail(email: string) {
    this.http
      .post('http://localhost:4000/auth/forgot-password', { email })
      .subscribe((res) => {
        try {
          console.log(res);
        } catch (error) {
          console.log('An error Occured');
        }
      });
  }

  resetPassword(body: any) {
    this.http
      .post(`http://localhost:4000/auth/reset-password/${body.userId}`, {
        newPassword: body.password,
      })
      .subscribe((res) => {
        try {
          console.log(res);
        } catch (error) {
          console.log('An error Occured');
        }
      });
  }

  async getUser(): Promise<User> {
    const res: any = await axios.get('http://localhost:4000/auth/get-user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    });
    console.log(res);
    const { exp, iat, ...rest } = res.data.user;
    this.user = rest;
    console.log(this.user);
    return rest;
  }
}
