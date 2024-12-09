import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get emailIsInvalid() {
    const email = this.form.get('email');
    return email?.touched && email.dirty && email.invalid;
  }

  get passwordIsInvalid() {
    const password = this.form.get('password');
    return password?.touched && password.dirty && password.invalid;
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      console.log('Email:', email, 'Password:', password);
    } else {
      console.log('Form is invalid');
    }
  }
}
