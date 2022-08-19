import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  newUser = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['home']);
    }
  }

  handleChange(event: any) {
    const { value, name } = event.target;
    this.newUser = { ...this.newUser, [name]: value };
    console.log(this.newUser);
  }

  register(event: any) {
    event.preventDefault();
    console.log('submitting');
    if (this.newUser.confirm_password === this.newUser.password) {
      console.log('conection');
      this.auth.register(this.newUser);
    }
  }
}
