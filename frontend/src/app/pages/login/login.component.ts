import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['home']);
    }
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.user = { ...this.user, [name]: value };
  }

  login(event: any) {
    event.preventDefault();
    // this.auth.login(this.user);
    this.auth.login(this.user);
  }
}
