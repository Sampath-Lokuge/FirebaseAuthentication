import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class EventData {

  public currentUser: any;
  public eventList: any;
  public profilePictureRef: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser.uid;
    this.eventList = firebase.database().ref('userProfile/' + this.currentUser + '/eventList');
    this.profilePictureRef = firebase.storage().ref('/guestProfile/');
  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): Promise<any> {
    return this.eventList.push({
      name: eventName,
      date: eventDate,
      price: eventPrice,
      cost: eventCost,
      revenue: eventCost * -1
    });
  }

  getEventList(): any {
    return this.eventList;
  }

  getEventDetail(eventId): any {
    return this.eventList.child(eventId);
  }

  addGuest(guestName, eventId, eventPrice, guestPicture = null): firebase.Promise<any> {
    return this.eventList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then((newGuest) => {
      this.eventList.child(eventId).transaction((event) => {
        event.revenue += eventPrice;
        return event;
      });
      
      if (guestPicture != null) {
        this.profilePictureRef.child(newGuest.key).child('profilePicture.png')
          .putString(guestPicture, 'base64', { contentType: 'image/png' })
          .then((savedPicture) => {
            this.eventList.child(eventId).child('guestList').child(newGuest.key).child('profilePicture')
              .set(savedPicture.downloadURL);
          });
      }
    });
  }

}