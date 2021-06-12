import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private storage: AngularFireStorage) {}

  getProfilePhoto(userId: string) {
    return this.storage.ref(`users-photos/${userId}.jpg`).getDownloadURL();
  }
}
