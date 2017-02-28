import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { EventCreatePage } from '../event-create/event-create';
import { EventListPage } from '../event-list/event-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  goToCreate() {
    this.navCtrl.push(EventCreatePage);
  }

  goToList() {
    this.navCtrl.push(EventListPage);
  }

}
