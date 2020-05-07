import { Component, OnInit } from '@angular/core';
import { IAlbum, IEvent, Lightbox, LIGHTBOX_EVENT, LightboxConfig, LightboxEvent } from 'ngx-lightbox';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fromroot } from 'src/app/Store/store.index';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  sfname = '';
  slname = '';
  nmob = '';
  semail = '';
  suname = '';
  sgender = true;

  public activeTab: string;

  public editProfile: boolean;
  public editProfileIcon: string;

  public editContact: boolean;
  public editContactIcon: string;

  public editOtherInfo: boolean;
  public editOtherInfoIcon: string;

  public albums: Array<IAlbum>;
  private subscription: Subscription;

  count$: Observable<any>;

  // tslint:disable-next-line: max-line-length
  constructor(private lightbox: Lightbox, private lightboxEvent: LightboxEvent, private lighboxConfig: LightboxConfig, private store: Store<{ data: any }>, private userService: UserServiceService) {
    this.activeTab = 'profile';

    this.editProfile = false;
    this.editProfileIcon = 'icon-edit';

    // this.editContact = false;
    // this.editContactIcon = 'icon-edit';

    // this.editOtherInfo = false;
    // this.editOtherInfoIcon = 'icon-edit';

    // this.albums = [];
    // for (let i = 1; i <= 6; i++) {
    //   const album = {
    //     src: 'assets/images/light-box/l' + i + '.jpg',
    //     caption: 'Image ' + i + ' caption here',
    //     thumb: 'assets/images/light-box/sl' + i + '.jpg'
    //   };

    // this.albums.push(album);
    // }
    // lighboxConfig.fadeDuration = 1;
    this.count$ = store.select('data');
  }

  sFname = new FormControl(this.sfname, [Validators.required]);
  sLname = new FormControl(this.slname, Validators.required);
  sGender = new FormControl('', Validators.required);
  nMob = new FormControl(this.nmob, [Validators.required, Validators.minLength(10)]);
  sEmail = new FormControl(this.semail, [Validators.required, Validators.email]);
  sUname = new FormControl(this.suname, Validators.required);

  editForm = new FormGroup({
    sFname: this.sFname,
    sLname: this.sLname,
    sGender: this.sGender,
    nMob: this.nMob,
    sEmail: this.sEmail,
    sUname: this.sUname
  });
  ngOnInit() {
    this.store.dispatch(fromroot.profileApi());
    this.userService.userData().subscribe((res) => {
      // tslint:disable-next-line: forin
      for (const  values in res) {
        this.sfname = res[values].sFname;
        this.slname = res[values].sLname;
        this.nmob = res[values].nMob;
        this.semail = res[values].sEmail;
        this.suname = res[values].sUname;
      }
    });
  }

  open(index: number): void {
    // this.subscription = this.lightboxEvent.lightboxEvent$.subscribe((event: IEvent) => this._onReceivedEvent(event));
    // this.lightbox.open(this.albums, index, { wrapAround: true, showImageNumberLabel: true });
  }

  private _onReceivedEvent(event: IEvent): void {
    // if (event.id === LIGHTBOX_EVENT.CLOSE) {
    //   this.subscription.unsubscribe();
    // }
  }

  update() {
    if (confirm('Are you sure you want to update your profile')) {
      this.store.dispatch(fromroot.editProfileApi(this.editForm.value));
    } else {
      return false;
    }
  }

}
