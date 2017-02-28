import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})

export class EventListPage {
  public eventList: any;
  constructor(public navCtrl: NavController, public eventData: EventData) {

  }

  ionViewDidEnter() {
    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach(snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date
        });
      });
      this.eventList = rawList;
    });
  }

  goToEventDetail(eventId) {
    this.navCtrl.push(EventDetailPage, { eventId: eventId });
  }

}