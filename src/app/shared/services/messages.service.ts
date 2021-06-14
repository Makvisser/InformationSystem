import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { snapshotDataConverter } from '../helpers/data-converters';
import { map } from 'rxjs/operators';
import { Chat } from '../interfaces/chat';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private firestore: AngularFirestore) {}

  getMessagesByUserId(id: string): Observable<Chat[]> {
    return this.firestore
      .collection('chats')
      .snapshotChanges()
      .pipe(
        map((data) => data.map(snapshotDataConverter()) as Chat[]),
        map((data) => data.filter(({ users }) => users.includes(id))),
        map((data) =>
          data.sort((a, b) =>
            moment((a.messages[a.messages.length - 1].date as Timestamp).toDate()).diff(
              moment((b.messages[b.messages.length - 1].date as Timestamp).toDate()),
            ),
          ),
        ),
      );
  }
}

// map((data) => {
//   return data.map((el: Chat) => ({
//     ...el,
//     messages: el.messages
//       .map((val) => ({
//         ...val,
//         date: moment((val.date as Timestamp).toDate()),
//       }))
//       .sort((a, b) => a.date.diff(b.date)),
//   }));
// }),
