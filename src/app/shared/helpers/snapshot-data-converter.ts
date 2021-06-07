import { DocumentChange, DocumentChangeAction } from '@angular/fire/firestore';
import firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;

export const snapshotDataConverter =
  (getRef = false) =>
  ({ payload }: DocumentChangeAction<any>) =>
    Object.assign(
      {
        id: payload.doc.id,
        ...payload.doc.data(),
      },
      getRef ? { ref: payload.doc.ref as DocumentReference } : {},
    );
