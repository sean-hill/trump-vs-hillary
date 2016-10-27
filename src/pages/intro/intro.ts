import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  loading: Boolean = false;

  constructor(
    public viewCtrl: ViewController,
    public af: AngularFire
  ) {}

  startVoting() {
    this.loading = true;
    this.af.auth.login({
      provider: AuthProviders.Anonymous,
      method: AuthMethods.Anonymous,
    }).then(() => {
      setTimeout(() => {
        this.viewCtrl.dismiss().then(() => {
          this.loading = false;
        });
      }, 1500);
    });
  }

}
