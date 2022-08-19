import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css'],
})
export class CreateContactComponent implements OnInit {
  newContact = {
    name: '',
    phoneNo: '',
  };
  closeResult: string | undefined;
  @ViewChild('mymodal') myModal: (() => undefined) | undefined;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigate(['']);
    }
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.newContact = { ...this.newContact, [name]: value };
  }

  createContact(event: any) {
    event.preventDefault();
    const { userId } = this.auth.user;
    this.http
      .post(
        `http://localhost:4000/contacts`,
        {
          ...this.newContact,
          created_by: userId,
        },
        this.auth.options
      )
      .subscribe((res) => {
        try {
          console.log(res);
          this.open(this.myModal);
          this.newContact = {
            name: '',
            phoneNo: '',
          };
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  open(content: any) {
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
}
