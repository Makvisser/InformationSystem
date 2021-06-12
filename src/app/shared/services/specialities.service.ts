import { Injectable } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { dbConverter } from '../helpers/data-converters';
import { SnapshotData } from '../interfaces/snapshot-data.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { fromPromise } from 'rxjs/internal-compatibility';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class SpecialitiesService {
  collection: string = 'specialities';
  constructor(private fireDB: AngularFireDatabase,) {}

  getSpecialities(): Observable<SnapshotData[]> {
    return this.fireDB
      .object(this.collection)
      .snapshotChanges()
      .pipe(
        map(({ payload }: { payload: DataSnapshot }) => payload.exportVal()),
        map(dbConverter),
      );
  }

  // updateName(ref: string): Observable<any> {
  //   return fromPromise(
  //     this.fireDB.database
  //       .ref(`${this.collection}/${ref.replace(/\//g, '/children/')}`)
  //       .update({ name: 'tset' }),
  //   );
  // }
}
