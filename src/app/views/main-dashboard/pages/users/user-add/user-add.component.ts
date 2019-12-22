import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './../../../../../shared/classes/User.class';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  onSubmitForm(form: NgForm) {
    const v = form.value;
    let newUser = new User(v.first_name, v.last_name, 0, v.email, v.avatar);
    this.usersService.sendNewUserToAdd(newUser);
    form.reset();
  }
}
