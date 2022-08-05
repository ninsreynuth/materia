import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  key: any;
  constructor(private http: HttpClient) {}
  // public saveData(key: string, value: string) {
  //   localStorage.setItem(key, this.encrypt(value));
  // }

  public getData(key: string) {
    let data = localStorage.getItem(key) || '';
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }
  postProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/productList', data).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getProduct() {
    return this.http.get<any>('http://localhost:3000/productList').pipe(
      map((res) => {
        return res;
      })
    );
  }
  putProduct(data: any, id: number) {
    return this.http
      .put<any>('http://localhost:3000/productList/' + id, data)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  deleteProduct(id: number) {
    return this.http
      .delete<any>('http://localhost:3000/productList/' + id)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getUser(data: any) {
    const res = this.http.get<any>('http://localhost:3000/signUp');
    const user = res.subscribe((users) => {
      return users.find((user: any) => {
        return (
          user.userName === data.username && user.password === data.password
        );
      });
    });

    return user;
  }

  storeUser(data: any) {
    return this.http.post<any>('http://localhost:3000/users', data);
  }

  // addUser
  // addUser(user: any) {
  // let users = [];
  // if (localStorage.getItem('Users')) {
  //   const localUser = localStorage.getItem('Users') ?? '{}';
  //   users = JSON.parse(localUser);
  //   users = [user, ...users];
  // } else {
  //   users = [user];
  // }
  // localStorage.setItem('Users', JSON.stringify(user));
  // }
}
