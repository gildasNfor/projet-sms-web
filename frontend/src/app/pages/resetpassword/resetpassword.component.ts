import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css'],
})
export class ResetpasswordComponent implements OnInit {
  password = {
    password: '',
    confirm_password: '',
  };
  @ViewChild('mymodal') myModal: (() => undefined) | undefined;

  userId: string | null = '';
  closeResult: string | undefined;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['home']);
    }
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log(this.userId);
  }

  handleChange(event: any) {
    const { name, value } = event.target;
    this.password = { ...this.password, [name]: value };
  }

  setPassword(event: any) {
    event.preventDefault();
    if (this.password.password === this.password.confirm_password) {
      this.auth.resetPassword({
        password: this.password.password,
        userId: this.userId,
      });
      this.open(this.myModal);
    }
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
