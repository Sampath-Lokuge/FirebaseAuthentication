import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController, public authData: AuthData) {

  }

  logOut() {
    this.authData.logoutUser().then(() => { this.nav.setRoot(LoginPage); });
  }

}
