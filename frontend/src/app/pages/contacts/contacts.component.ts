import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Contact } from 'src/app/utils/interfaces';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Array<Contact> = [];
  contactId: string = '';
  limit: string = '5';
  offset: string = '0';
  pages: Array<Object> = [];

  closeResult: string | undefined;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigate(['']);
    }
    await this.auth.getUser();
    const { userId } = this.auth.user;

    this.http
      .get(
        `http://localhost:4000/contacts/${userId}?limit=${this.limit}&offset=${this.offset}`,
        this.auth.options
      )
      .subscribe((res: any) => {
        try {
          this.contacts = res.contacts;
          this.pages = new Array(res.pages);
          console.log(res.pages);
        } catch (error) {
          console.log('An error occured');
        }
      });
  }
  open(content: any, event: any) {
    const { id } = event.target;
    this.contactId = id;
    console.log(id);

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async close(content: any) {
    await axios.delete(
      `http://localhost:4000/contacts/delete/${this.contactId}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      }
    );
    this.modalService.dismissAll(content);
    this.ngOnInit();
  }

  getPaginatedContacts(event: any) {
    console.log(event.target.textContent);
    try {
      const num = parseInt(event.target.textContent);
      this.offset = ((num - 1) * 5).toString();
    } catch (error) {}
    this.ngOnInit();
  }
}
