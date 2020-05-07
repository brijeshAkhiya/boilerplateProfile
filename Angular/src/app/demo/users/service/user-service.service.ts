import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userDataUrl = 'https://brijesh-task.herokuapp.com/profile';
  updateProfileUrl = 'https://brijesh-task.herokuapp.com/editProfile';
  constructor(private http: HttpClient) { }

  userData() {
    const token = localStorage.getItem('token');
    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    return this.http.get(this.userDataUrl, httpoptions);
  }

  userDataUpdate(data) {
    const token = localStorage.getItem('token');
    const httpoptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    };
    return this.http.post(this.updateProfileUrl, data, httpoptions);
  }
}
