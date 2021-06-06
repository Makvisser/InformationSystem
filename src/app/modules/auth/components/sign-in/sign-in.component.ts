import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) {}
  signInForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  getUser() {
    this.signInForm.markAllAsTouched();
    if (this.signInForm.valid) {
      this.authService.getUser(this.signInForm.getRawValue()).subscribe(
        (data) => {
          console.log(data);
          this.authService.setUser(data);
        },
        (error) => console.log(error),
      );
    }
  }
}
