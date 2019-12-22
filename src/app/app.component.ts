import { AuthService } from './views/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loginApp';
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }


}
