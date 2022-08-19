import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/utils/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  user: User = {
    userId: '',
    username: '',
  };
  constructor(private router: Router, private auth: AuthService) {}

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigate(['']);
    }
    this.user = await this.auth.getUser();
    console.log(this.auth.getUser());
    console.log(this.user);
  }
}
