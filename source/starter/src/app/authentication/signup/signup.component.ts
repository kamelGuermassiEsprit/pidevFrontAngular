import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  error = '';
  successMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      user_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
      termcondition: [false, Validators.requiredTrue],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';
    this.successMessage = '';
  
    if (this.registerForm.invalid) {
      this.error = 'Invalid data!';
      return;
    }
  
    const user = {
      user_name: this.registerForm.value.user_name,
      email: this.registerForm.value.email,
      passwordHash: this.registerForm.value.password,
      role: this.registerForm.value.role,
    };
  
    this.http.post('http://localhost:5001/nomadNest/user/signup', user)
      .subscribe({
        next: (response: any) => {
          this.successMessage = response.message;
          this.router.navigate(['/authentication/email-verification'], { queryParams: { email: user.email } });
        },
        error: (err: any) => {
          console.log('Error Response:', err); // Log the error response to debug
          if (err.error && err.error.errors) {
            if (err.error.errors.user_name) {
              this.error = err.error.errors.user_name;
            } else if (err.error.errors.email) {
              this.error = err.error.errors.email;
            } else if (err.error.errors.passwordHash) {
              this.error = err.error.errors.passwordHash;
            } else {
              this.error = 'An unexpected error occurred';
            }
          } else {
            this.error = 'An unexpected error occurred';
          }
        }
      });
  }
  
  
}
