import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { UserMetadata } from '../interfaces/userMetadata';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StudentInfo } from '../interfaces/student-info';
import { snapshotDataConverter } from '../helpers/data-converters';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  collection: string = 'users';
  currentUser: BehaviorSubject<StudentInfo> = new BehaviorSubject<StudentInfo>(null);
  constructor(private firestore: AngularFirestore, private router: Router) {
    this.currentUser.next(JSON.parse(localStorage.getItem('user')));
  }

  getUsers(): Observable<StudentInfo[]> {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(map((data) => data.map(snapshotDataConverter()) as StudentInfo[]));
  }

  getUser(user: UserMetadata): Observable<StudentInfo> {
    return this.getUsers().pipe(
      switchMap((data) => {
        const foundUser = data.find(
          ({ login, password }: StudentInfo) => login === user.login && password === user.password,
        );
        return !foundUser ? throwError('No Such user') : of(foundUser);
      }),
    );
  }

  setUser(user: StudentInfo): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.next(user);
    this.router.navigateByUrl('/main').then();
  }

  signOut(): void {
    localStorage.removeItem('user');
    this.currentUser.next(null);
    this.router.navigateByUrl('/auth').then();
  }
}
