import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { distinct, distinctUntilChanged, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private storage: AngularFireStorage) {}

  getProfilePhoto(userId: string): Observable<string> {
    return this.storage
      .ref(`users-photos/${userId}.jpg`)
      .getDownloadURL()
      .pipe(distinctUntilChanged((a, b) => a === b));
  }
}
