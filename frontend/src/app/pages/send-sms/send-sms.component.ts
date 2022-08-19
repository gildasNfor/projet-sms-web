import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css'],
})
export class SendSMSComponent implements OnInit {
  body = {
    phoneNo: '',
    message: '',
  };
  @ViewChild('mymodal') myModal: (() => undefined) | undefined;

  contactId: string | null = '';
  closeResult: string | undefined;
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token') === null) {
      this.router.navigate(['']);
    }
    this.contactId = this.route.snapshot.paramMap.get('contactId');
    console.log(this.contactId);
    this.http
      .get(`http://localhost:4000/contact/${this.contactId}`, this.auth.options)
      .subscribe((res: any) => {
        try {
          console.log(res);
          this.body = { ...this.body, phoneNo: res.phoneNo };
          console.log(this.body);
        } catch (error) {
          console.log('An error occured');
        }
      });
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.body = { ...this.body, [name]: value };
  }

  sendSms(event: any) {
    event.preventDefault();
    this.http
      .post(
        'http://localhost:4000/send-sms',
        {
          contactId: this.contactId,
          ...this.body,
        },
        this.auth.options
      )
      .subscribe((res: any) => {
        try {
          console.log(res);
          this.body.message = '';
          this.open(this.myModal);
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
