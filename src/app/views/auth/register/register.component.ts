import { AuthService } from './../auth.service';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  hide: boolean = true;
  errorMsg: string = '';
  loader: boolean = false;
  @ViewChild("fullNameFocuse", { static: false }) fullNameFocuse: ElementRef;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.fullNameFocuse.nativeElement.focus();
    }, 300);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [
        '', [
          Validators.required,
          Validators.email
        ]
      ],
      //this field is not required for api request it is just for design purpose.
      full_name: [
        '', [
          Validators.required,
          Validators.minLength(2),
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


  onSubmitForm() {
    this.loader = true;
    this.authService.sign(this.form.value, 'register').subscribe(data => {
      console.log(data);
      this.loader = false;
      this.router.navigate(['private/users'], { fragment: 'register' });
    }, (err) => {
      this.errorMsg = err;
      this.loader = false;
    });
  }
}


