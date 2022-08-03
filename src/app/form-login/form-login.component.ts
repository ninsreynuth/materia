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
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
})
export class FormLoginComponent implements OnInit {
  hide = true;
  public signUp !: FormGroup;
  constructor(private apiService: ApiService, private http: HttpClientModule, private formBuilder: FormBuilder, private router:Router) {}
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
    this.signUp= this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:[''],

    })
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
  singUp(){
    this.http.post<any>("http://localhost:3000/signUpUsers", this.signUp.value).subscribe(res=>{
      alert ("signUp Successfull")
      this.signUp.reset(['logIn']);
    })
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
