import { user } from './../models/user.model';
export class User implements user {
  first_name: string;
  last_name: string;
  id: number;
  email: string;
  avatar: string;

  constructor(first_name: string, last_name: string, id: number, email: string, avatar: string) {
    this.first_name = first_name;
    this.id = id;
    this.last_name = last_name;
    this.email = email;
    this.avatar = avatar;
  }

}
