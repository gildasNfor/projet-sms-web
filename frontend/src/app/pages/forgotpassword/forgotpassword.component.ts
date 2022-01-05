import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
  email: string = '';
  @ViewChild('mymodal') myModal: (() => undefined) | undefined;
  closeResult: string | undefined;

  constructor(
    private auth: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['home']);
    }
  }

  handleChange(event: any) {
    const { value } = event.target;
    this.email = value;
  }

  setPassword(event: any) {
    event.preventDefault();
    this.auth.sendEmail(this.email);
    this.open(this.myModal);
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
