import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logUrl = 'https://brijesh-task.herokuapp.com/login';
  changePasswordUrl = 'https://brijesh-task.herokuapp.com/changePassword';
  signupUrl = 'https://brijesh-task.herokuapp.com/signup';
  constructor(private http: HttpClient) { }
  login(data) {
    return this.http.post(this.logUrl, data, {responseType: 'json'});
  }

  changePassword(data) {
    const token = localStorage.getItem('token');
    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    return this.http.post(this.changePasswordUrl, data, httpoptions);
  }
  signup(data) {
    return this.http.post(this.signupUrl, data);
  }
}
