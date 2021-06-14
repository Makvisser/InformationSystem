import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { snapshotDataConverter } from '../helpers/data-converters';
import { distinct, distinctUntilKeyChanged, map, tap } from 'rxjs/operators';
import { Chat, Message } from '../interfaces/chat';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;
import * as moment from 'moment';
import FieldValue = firebase.firestore.FieldValue;
import { StudentInfo } from '../interfaces/student-info';
import { TeacherInfo } from '../interfaces/teacher-info';
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private firestore: AngularFirestore) {}

  getMessagesByUserId(id: string): Observable<Chat[]> {
    return fromPromise(
      this.firestore
        .collection('chats')
        .ref.where('users', 'array-contains', id)
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map((el) => ({ id: el.id, ...(el.data() as any) })) as Chat[];
        }),
    );
    // .pipe(
    //   map((data) => data.map(snapshotDataConverter()) as Chat[]),
    //   map((data) => data.filter(({ users }) => users.includes(id))),
    //   map((data) =>
    //     data.sort(
    //       (a, b) =>
    //         (a.messages[a.messages.length - 1].date as Timestamp).toMillis() -
    //         (b.messages[b.messages.length - 1].date as Timestamp).toMillis(),
    //     ),
    //   ),
    // );
  }

  getMessagesByChatId(chatId: string): Observable<Chat> {
    return this.firestore
      .collection('chats')
      .doc(chatId)
      .valueChanges({ idField: 'id' } as any)
      .pipe(
        distinctUntilKeyChanged('messages' as never),
        map((el: Chat) => ({
          ...el,
          messages: el.messages.map((val) => ({
            ...val,
            date: val.date as Timestamp,
          })),
        })),
      );
  }

  createMessage(messages: Message[], chatId: string, userId: string, value: string) {
    this.firestore
      .collection('chats')
      .doc(chatId)
      .update({
        messages: [
          ...messages,
          {
            userId,
            value,
            unread: true,
            date: Timestamp.fromMillis(Date.now()),
          },
        ],
      })
      .then();
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
