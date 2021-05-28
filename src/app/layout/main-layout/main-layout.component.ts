import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements OnInit {
  loggedIn = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService
      .checkSession()
      .pipe()
      .subscribe(
        (res) => {
          this.loggedIn = true;
        },
        (error) => {
          this.loggedIn = false;
          console.log(error);
        }
      );
  }
}
