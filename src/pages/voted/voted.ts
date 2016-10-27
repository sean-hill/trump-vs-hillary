import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-voted',
  templateUrl: 'voted.html'
})
export class VotedPage {

  nominee: any;

  constructor(
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public storage: Storage
  ){
    this.nominee = this.navParams.get('nominee');
  }

  revote() {
    Promise.all([
      this.storage.remove('voted'),
      this.storage.remove('nominee'),
    ]).then(() => {
      this.viewCtrl.dismiss()
    });
  }

}
