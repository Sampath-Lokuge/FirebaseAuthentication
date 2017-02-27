import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import firebase from 'firebase';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform) {
    this.zone = new NgZone({});

    firebase.initializeApp({
      apiKey: "AIzaSyC-90ppNAaynQZJ8gm_wFG4YoJHGmpd3uU",
      authDomain: "event-management-app-25c7d.firebaseapp.com",
      databaseURL: "https://event-management-app-25c7d.firebaseio.com",
      storageBucket: "event-management-app-25c7d.appspot.com",
      messagingSenderId: "447854573068"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run(() => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
