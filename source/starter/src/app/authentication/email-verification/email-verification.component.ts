import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
  verificationForm: FormGroup;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.verificationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      verificationCode: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.verificationForm.patchValue({ email: params['email'] });
      }
    });
  }

  onSubmit() {
    if (this.verificationForm.invalid) {
      return;
    }

    const { email, verificationCode } = this.verificationForm.value;
    this.authService.verifyEmail({ email, verificationCode }).subscribe({
      next: (response: any) => {
        this.router.navigate(['/authentication/signin']);
      },
      error: (err: any) => {
        this.error = err.error.message || 'An error occurred during verification';
      }
    });
  }
}
