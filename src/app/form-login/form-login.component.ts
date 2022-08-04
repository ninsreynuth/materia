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
  // form = new FormGroup({
  //   userName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(10),
  //   ]),
  //   password: new FormControl('', Validators.required),
  //   firstName: new FormControl('', Validators.required),
  //   lastName: new FormControl('', Validators.required),
  //   Email: new FormControl('', Validators.required),
  //   confirmPassword: new FormControl('', Validators.required),
  // });
  // get userName() {
  //   return this.form.get('userName');
  // }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/users').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.p
          );
        });
        if (user) {
          alert('Login Success');
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
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

  // login() {
  //   const login = this.apiService.getUser({
  //     username: this.form.get('userName')?.value,
  //     password: this.form.get('password')?.value,
  //   });
  //   console.log(login);
  // }
  // }

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
