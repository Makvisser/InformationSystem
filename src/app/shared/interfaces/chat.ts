import { SnapshotData } from './snapshot-data.interface';
import * as moment from 'moment';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Message {
  date: moment.Moment | Timestamp;
  value: string;
  userId: string;
  unread: boolean;
}

export interface Chat extends SnapshotData {
  users: string[];
  messages: Message[];
}
