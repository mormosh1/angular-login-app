import { AuthService } from './../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas);

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar, ) {
  }

  ngOnInit() {
    this.routeFragment();

  }


  routeFragment() {
    this.route.fragment.subscribe((fragment: string) => {
      var msg: string = "";
      switch (fragment) {
        case 'success':
          msg = "You have successfully logged in!";
          this.router.navigate(['/private/users']);
          break;
        case '':
          msg = "you're logged in.";
          break;
          case 'register':
            msg = "You have successfully register!";
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


}
