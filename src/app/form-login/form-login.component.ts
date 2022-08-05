import { Component, OnInit } from '@angular/core';
import { ApiService } from '../dialog/service/api.service';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
  hide = true;
  public loginForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // login
  login() {
    this.http.get<any>('http://localhost:3000/users').subscribe(
      (res) => {
        const users = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });
        if (this.loginForm.valid) {
          alert('Login Success');
          localStorage.getItem('userName');
          this.loginForm.reset();
          this.router.navigate(['form-builder']);
          // this.loginForm.reset();
        } else {
          alert('user not found new user go to signUp');
        }
      },
      (err) => {
        alert('something went wrong');
      }
    );
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  // confirmPassword() {
  //   console.log({
  //     password: this.form.get('password')?.getRawValue(),
  //     confirmPassword: this.form.get('confirmPassword')?.getRawValue(),
  //   });
  //   if (
  //     this.form.get('password')?.getRawValue() !==
  //     this.form.get('confirmPassword')?.getRawValue()
  //   ) {
  //   } else {
  //     this.message = '';
  //   }
  // }
  // }
}
