import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  hide: boolean = true;
  errorMsg: string = '';
  loader: boolean = false;
  @ViewChild("emailFocus", { static: false }) emailFocus: ElementRef;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.emailFocus.nativeElement.focus();
    }, 300);
  }

  ngOnInit() {
    this.routeFragment();
    this.form = this.formBuilder.group({
      email: [
        '', [
          Validators.required,
          Validators.email
        ]
      ],
      //i keeping password as simple as possible for this case.
      //i did not put any pattern uniq like:  (?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}  Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
      password: [
        '', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ]
      ]
    });
  }

  routeFragment() {
    this.route.fragment.subscribe((fragment: string) => {
      var msg: string = "";
      switch (fragment) {
        case 'success':
          msg = "You have successfully logged out!";
          break;
        case 'expired':
          msg = "session expired! please logged in.";
          break;
        default:
          msg = "";
      }
      if (!!msg) this.openSnackBar(msg);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'dismiss', {
      duration: 3000
    });
  }

  onSubmitForm() {
    this.loader = true;
    this.authService.sign(this.form.value, "login").subscribe(data => {
      console.log(data);
      this.loader = false;
      this.router.navigate(['/private'], { fragment: 'success' });
    }, (err) => {
      this.errorMsg = err;
      this.loader = false;
    });
  }


}



