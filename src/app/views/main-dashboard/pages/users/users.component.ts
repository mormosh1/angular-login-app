import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { user } from './../../../../shared/models/user.model';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserAddComponent } from './user-add/user-add.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: user[];
  selectedUser: user;
  constructor(private usersService: UsersService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.getUsers();
    this.addUser();
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
      if (this.users.length > 0) {
        this.selectedUser = this.users[0];
      }
    });
  }

  onSelectedUser(user: user) {
    this.selectedUser = user;
  }

  addUser() {
    this.usersService.newUserToAdd$.subscribe(user => {
      this.users.unshift(user);
    });
  }

  openBottomSheet() {
    this.bottomSheet.open(UserAddComponent);
  }

}
