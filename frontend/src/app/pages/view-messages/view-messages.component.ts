import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from 'src/app/utils/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrls: ['./view-messages.component.css'],
})
export class ViewMessagesComponent implements OnInit {
  contactId: string | null = '';
  messages: Array<Message> = [];
  pages: Array<Object> = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigate(['']);
    }
    this.contactId = this.route.snapshot.paramMap.get('contactId');
    console.log(this.contactId);
    this.http
      .get(
        `http://localhost:4000/messages/${this.contactId}`,
        this.auth.options
      )
      .subscribe((res: any) => {
        try {
          console.log(res);
          const page = Math.floor(res.length / 5) + 1;

          this.pages = new Array(page);
          this.messages = res;
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  getPaginatedMessages(event: any) {}
}
