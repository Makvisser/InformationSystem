import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { UserMetadata } from '../interfaces/userMetadata';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StudentInfo } from '../interfaces/student-info';
import { snapshotDataConverter } from '../helpers/data-converters';
import { fromPromise } from 'rxjs/internal-compatibility';
import { TeacherInfo } from '../interfaces/teacher-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  collection: string = 'users';
  currentUser: BehaviorSubject<StudentInfo | TeacherInfo> = new BehaviorSubject<
    StudentInfo | TeacherInfo
  >(null);
  constructor(private firestore: AngularFirestore, private router: Router) {
    this.currentUser.next(JSON.parse(localStorage.getItem('user')));
  }

  getUsers(): Observable<UserMetadata[]> {
    return this.firestore
      .collection(this.collection)
      .snapshotChanges()
      .pipe(map((data) => data.map(snapshotDataConverter()) as UserMetadata[]));
  }

  getUser(user: UserMetadata): Observable<StudentInfo | TeacherInfo> {
    return this.getUsers().pipe(
      switchMap((data) => {
        const foundUser = data.find(
          ({ login, password }: StudentInfo) => login === user.login && password === user.password,
        );
        return !foundUser
          ? throwError('No Such user')
          : fromPromise(
              this.firestore
                .collection(`${foundUser.role}s`)
                .ref.where('userId', '==', foundUser.id)
                .get()
                .then((querySnapshot) => {
                  const [user] = querySnapshot.docs;
                  return {
                    id: user.id,
                    ...(user.data() as any),
                    role: foundUser.role,
                    login: foundUser.login,
                  } as StudentInfo | TeacherInfo;
                }),
            );
      }),
    );
  }

  setUser(user: StudentInfo | TeacherInfo): void {
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
