import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logUrl = 'https://brijesh-task.herokuapp.com/login';
  changePasswordUrl = 'https://brijesh-task.herokuapp.com/changePassword';
  signupUrl = 'https://brijesh-task.herokuapp.com/signup';
  resetPasswordLinkUrl = 'https://brijesh-task.herokuapp.com//resetPasswordLink';
  resetPasswordUrl = 'https://brijesh-task.herokuapp.com//resetPassword';
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
  resetPasswordLink(data) {
    return this.http.post(this.resetPasswordLinkUrl, data);
  }
  resetPassword(data) {
    const auth = localStorage.getItem('auth');
    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: auth
      })
    };
    return this.http.post(this.resetPasswordUrl, data, httpoptions);
  }
}
