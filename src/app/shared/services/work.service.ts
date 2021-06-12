import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { SnapshotData } from '../interfaces/snapshot-data.interface';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  constructor(private firestore: AngularFirestore) {}

  createNewWork(teacherId: string, studentId: string) {
    return fromPromise(
      this.firestore.collection('works').add({
        teacherId,
        studentId: [studentId],
        title: { value: '', completed: false },
        isDone: false,
        practice: { value: '', completed: false },
        technologies: { value: '', completed: false },
        theory: { value: '', completed: false },
      } as Project),
    );
  }

  getWorksById(id: string, role: 'teacher' | 'student'): Observable<Project[]> {
    return fromPromise(
      this.firestore
        .collection('works')
        .ref.where(`${role}Id`, role === 'teacher' ? '==' : 'array-contains', id)
        .get()
        .then((querySnapshot) => {
          return querySnapshot.docs.map(
            (data) => ({ id: data.id, ...(data.data() as any) } as Project),
          );
        }),
    );
  }

  updateProject(newProjectData: Project) {
    this.firestore
      .collection('works')
      .doc(newProjectData.id)
      .update(newProjectData)
      .then((data) => console.log(data));
  }
}
