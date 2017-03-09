import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
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
          cost: snap.val().cost,
          date: snap.val().date
        });
      });
      this.eventList = rawList;
    });
  }

  /* ionViewDidEnter() {
     let rawList = [];
     rawList.push({
       id: 10,
       name: 'sampath',
       price: 10,
       cost: 20,
       date: 14
     });
     rawList.push({
       id: 20,
       name: 'lokuge',
       price: 30,
       cost: 50,
       date: 15
     });
     this.eventList = rawList;
   }*/

  goToEventDetail(eventId) {
    this.navCtrl.push(EventDetailPage, { eventId: eventId });
  }

}