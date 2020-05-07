import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromroot } from 'src/app/Store/store.index';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  stream: Observable<any>;

  constructor(private router: Router, private store: Store<{data: any}>) {
    this.stream = store.select('data');
  }
  ngOnInit() {
    this.store.dispatch(fromroot.profileApi());
  }

  signout() {
    localStorage.setItem('token', '');
  }
}
