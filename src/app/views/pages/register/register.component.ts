import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  registerUser() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      console.log('Submitted');
      // Send the data to the API
      const apiUrl = 'http://localhost:3000/auth/signup';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post(apiUrl, userData, httpOptions)
        .pipe(
          catchError((error: any) => {
            console.error('Registration error:', error);
            return throwError(error); // Re-throw the error
          })
        )
        .subscribe(
          response => {
            console.log('Registration successful:', response);
            // Optionally, perform further actions after successful registration
            this.router.navigate(['/users']);
          }
        );
    }
  }
}
