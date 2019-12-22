import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { user } from './../../../../shared/models/user.model';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private newUserToAdd = new EventEmitter<user>();
  newUserToAdd$ = this.newUserToAdd.asObservable();

  constructor(private http: HttpClient) { }

  getUsers() {
    const arr: user[] = [];
    return forkJoin(
      this.http.get('https://reqres.in/api/users?page=1'),
      this.http.get('https://reqres.in/api/users?page=2'),
      this.http.get('https://reqres.in/api/users?page=3'),
      this.http.get('https://reqres.in/api/users?page=4'),
      this.http.get('https://reqres.in/api/users?page=5')
    ).pipe(
      map(res => {
        for (let x of res) {
          arr.push(...x['data'])
        }
        return arr;
      })
    );
  }

  sendNewUserToAdd(user: user) {
    this.newUserToAdd.emit(user)
  }

}
