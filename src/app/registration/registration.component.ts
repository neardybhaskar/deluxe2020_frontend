import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValidator } from './confirmed.validator';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  loggedIn = false;
  userExist = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        cPassword: ['', Validators.required],
      },
      {
        validator: ConfirmedValidator('password', 'cPassword'),
      }
    );

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

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authenticationService
      .register(
        this.f.firstname.value,
        this.f.lastname.value,
        this.f.email.value,
        this.f.password.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.loading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          if (error.error == 'emailExists') {
            this.userExist = true;
          }
          this.loading = false;
        }
      );
  }
}
