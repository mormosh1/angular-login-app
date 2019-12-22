import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { user } from './../../../../../shared/models/user.model';


@Component({
  selector: 'app-user-chip',
  templateUrl: './user-chip.component.html',
  styleUrls: ['./user-chip.component.scss']
})
export class UserChipComponent implements OnInit {
  @Input() user: user;
  @Input() index: number;
  @Output() markUserEvent: EventEmitter<user> = new EventEmitter();
  selectedChip: number;

  constructor() { }

  ngOnInit() {
  }


  onSelectUser(user: user) {
    this.selectedChip = user.id;
    this.markUserEvent.emit(user);
  }
}
