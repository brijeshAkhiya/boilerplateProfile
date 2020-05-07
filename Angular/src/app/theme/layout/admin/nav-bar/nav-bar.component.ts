import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NextConfig} from '../../../../app-config';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public nextConfig: any;
  public menuClass: boolean;
  public collapseStyle: string;
  public windowWidth: number;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onNavCollapse = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onNavHeaderMobCollapse = new EventEmitter();

  constructor() {
    this.nextConfig = NextConfig.config;
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() { }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = (this.menuClass) ? 'block' : 'none';
  }

  navCollapse() {
    if (this.windowWidth >= 992) {
      this.onNavCollapse.emit();
    } else {
      this.onNavHeaderMobCollapse.emit();
    }
  }

}
