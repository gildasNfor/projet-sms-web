import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const res: any = await axios.post(
      'http://proxysms.mufoca.com/api/v0/shortMessages',
      {
        phoneNumber: '672840255',
        message: 'Wahala',
      },
      {
        headers: {
          Authorization:
            'Basic ZjE2MTg3ZGE3MGI2OmI2OTAxZDQwLWYyMTEtOTMwYS04ZTBjLTFjZGFkN2E2NGY5OQ==',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(res);
  }
}
// ex83Tf0nLyo_38p7QC4VNC2WMudCEtnjYLLlqdYMgre
