import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      // Send the data to the API
      const apiUrl = 'http://localhost:3000/auth/login';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      this.http.post(apiUrl, userData, httpOptions)
        .pipe(
          catchError((error: any) => {
            console.error('Login error:', error);
            return throwError(error); // Re-throw the error
          })
        )
        .subscribe(
          response => {
            console.log('Login successful:', response);
            // Redirect to the dashboard or another route after successful login
            this.router.navigate(['/users']); // Replace 'dashboard' with the desired route
          }
        );
    }
  }
}
