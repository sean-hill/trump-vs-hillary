import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { IntroPage } from '../intro/intro';
import { VotedPage } from '../voted/voted';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nominees: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public af: AngularFire,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    this.af.auth.subscribe(auth => {
      this.init(auth);
    });
  }

  init(auth) {
    if (!auth) {
      let introModal = this.modalCtrl.create(IntroPage);
      introModal.present();
    }
    else {
      this.storage.get('voted').then(voted => {
        if (voted) {
          this.voted();
        }
        else {
          this.getNominees();
        }
      });
    }
  }

  getNominees() {
    if (!this.nominees) {
      this.nominees = this.af.database.list('/nominees');
    }
  }

  upvote(nominee) {

    nominee.voted = true;

    let confirm = this.alertCtrl.create({
      title: `Vote for ${ nominee.name.last }?`,
      message: `You're about to vote for ${ nominee.nickname}, you sure?`,
      buttons: [
        {
          text: 'Nevermind'
        },
        {
          text: `I'm in!`,
          handler: () => {
            this.af.database.list('/nominees').update(nominee.$key, {
              upvotes: nominee.upvotes + 1
            }).then(() => {
              this.storage.set('voted', true);
              this.storage.set('nominee', JSON.stringify(nominee)).then(() => this.voted());
            });
          }
        }
      ]
    });
    confirm.present();

  }

  voted() {
    this.storage.get('nominee').then(nominee => {
      let votedModal = this.modalCtrl.create(VotedPage, { nominee: JSON.parse(nominee) });
      votedModal.present().then(() => this.getNominees());
      votedModal.onDidDismiss(() => this.init(true));
    });
  }

}
