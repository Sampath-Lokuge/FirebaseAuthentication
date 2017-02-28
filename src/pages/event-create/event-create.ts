import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventData } from '../../providers/event-data';

@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})

export class EventCreatePage {
  constructor(public navCtrl: NavController, public eventData: EventData) {

  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number) {
    this.eventData.createEvent(eventName, eventDate, eventPrice, eventCost).then(() => {
      this.navCtrl.pop();
    });
  }

}
