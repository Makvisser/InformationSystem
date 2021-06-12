import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './shared/guards/auth.guard';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MomentPipe } from './shared/pipes/moment.pipe';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyC40IyZ6_cIr-v4JbtJc60Ivi5iPji4JzE',
      authDomain: 'information-system-590b0.firebaseapp.com',
      databaseURL:
        'https://information-system-590b0-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'information-system-590b0',
      storageBucket: 'information-system-590b0.appspot.com',
      messagingSenderId: '894500347189',
      appId: '1:894500347189:web:18c3b8f7ae4da23ae0007c',
    }),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
