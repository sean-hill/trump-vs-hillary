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

  share() {
    var sharer = 'https://www.facebook.com/sharer/sharer.php?u=';
    var app = 'https://trump-vs-hilary.firebaseapp.com';
    var url = `${sharer}${app}`;
    window.open(url, 'pop', 'width=600, height=400, scrollbars=no');
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
