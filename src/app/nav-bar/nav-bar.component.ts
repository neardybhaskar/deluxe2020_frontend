import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loggedIn = false;
  userRole = 'USER';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.checkSession().subscribe(
      (res) => {
        this.loggedIn = true;
        this.userRole = localStorage.getItem("userRole");
      },
      (error) => {
        this.loggedIn = false;
        console.log(error);
      }
    );

    // override the route reuse strategy
    // Refer url -> https://github.com/angular/angular/issues/13831?mihaicux2#issuecomment-319634921
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    //  This code helps in navigating the same page for 2nd or more time
    //  before reloading while navigating on same url 2nd+ times was not possible
    // Refer url -> https://github.com/angular/angular/issues/13831?mihaicux2#issuecomment-319634921
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(
      (res) => {
        localStorage.removeItem('xAuthToken');
        location.reload();
        this.router.navigate(['/login']).then(() => {
          location.reload();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleDisplay() {
    this.loggedIn = !this.loggedIn;
  }

  doSearch(searchText: string) {
    this.router.navigateByUrl(`/search/${searchText}`);
  }
}
