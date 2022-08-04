import { ApiService } from '../dialog/service/api.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  user: any = {};
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService
  ) {}
  ngOnInit(): void {
    // this.signUpForm = this.formBuilder.group(
    //   {
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     email: ['', Validators.required],
    //     password: ['', Validators.required],
    //     confirmPassword: ['', Validators.required],
    //   },
    //   { Validators: this.passwordMatchingValidator }
    // );
    this.signUpForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }
      // { Validators: this.passwordMatchingValidator }
    );
  }
  // *formGroup
  matcher = new MyErrorStateMatcher();
  // passwordMatchingValidator(fg: FormGroup): Validators {
  //   return fg.get('password')?.value === fg.get('confirmPassword')?.value
  //     ? null:
  //     // : { notmatched: true };
  // }
  get userName() {
    return this.signUpForm.get('userName') as FormControl;
  }
  get email() {
    return this.signUpForm.get('email') as FormControl;
  }
  get password() {
    return this.signUpForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword') as FormControl;
  }
  onSubmit() {
    // this.http
    //   .post('http://localhost:3000/users', this.signUpForm.getRawValue())
    //   .subscribe(
    //     (res) => {
    //       alert('signUp Successfully');
    //       this.signUpForm.reset();
    //       this.router.navigate(['/form-builder']);
    //     },
    //     (err) => {
    //       alert('something went wrong');
    //     }
    //   );
    if (this.signUpForm.valid) {
      this.api.storeUser(this.signUpForm.getRawValue()).subscribe({
        next: (res) => {
          alert('login is successfully');
          this.signUpForm.reset();
          localStorage.setItem('users', JSON.stringify(this.user));
          this.router.navigate(['/form-builder']);
        },
        error: () => {
          alert('something went wrong please go to signUp');
        },
      });
    }
  }

  // *onsubmit
  // onSubmit() {
  //   console.log(this.signUpForm);
  //   if (this.signUpForm.valid) {
  //     this.user = Object.assign(this.user, this.signUpForm.value);
  //     this.api.addUser(this.user);
  //     this.signUpForm.reset();
  //   }

  //   this.http
  //     .post<any>('http://localhost:3000/users', this.signUpForm.value)
  //     .subscribe(
  //       (res) => {
  //         alert('signUp Successfully');
  //         this.signUpForm.reset(['logIn']);
  //       },
  // (err) => {
  //   alert('something went wrong');
  // }
  //     );
  // }
}
