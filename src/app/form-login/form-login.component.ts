import { Component, OnInit } from '@angular/core';
import { ApiService } from '../dialog/service/api.service';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
  hide = true;
  constructor(private apiService: ApiService, private http: HttpClientModule) {}
  form = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  message: string = '';

  ngOnInit(): void {
    sessionStorage.getItem('user');
  }
  get userName() {
    return this.form.get('userName');
  }

  login() {
    const login = this.apiService.getUser({
      username: this.form.get('userName')?.getRawValue(),
      password: this.form.get('password')?.getRawValue(),
    });
    console.log(login);
  }
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
