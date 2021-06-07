import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { forkJoin, from, Observable, of, zip } from 'rxjs';
import { snapshotDataConverter } from '../helpers/snapshot-data-converter';
import firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import { fromPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root',
})
export class SpecialitiesService {
  private collection: string = 'specialities';
  constructor(private fireStore: AngularFirestore) {}

  getSpecialities() {
    return this.fireStore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(
        switchMap((data): Observable<any> => {
          return of(data.map(snapshotDataConverter()));
        }),
      );
  }
}
