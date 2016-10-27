import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { VotedPage } from '../pages/voted/voted';
import { Storage } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyCF2HKTOjlMUmSHVmrDO0d_J1DMT9w0l9U",
  authDomain: "trump-vs-hilary.firebaseapp.com",
  databaseURL: "https://trump-vs-hilary.firebaseio.com",
  storageBucket: "trump-vs-hilary.appspot.com",
  messagingSenderId: "86932376897"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    VotedPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    VotedPage
  ],
  providers: [Storage]
})
export class AppModule {}
