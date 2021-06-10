import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as moment from 'moment';
import { Task } from '../interfaces/task';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
import { dbConverter } from '../helpers/data-converters';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private fireDB: AngularFireDatabase, private authService: AuthService) {}

  createNewTask(value: string, date: moment.Moment) {
    return this.fireDB.database
      .ref(`tasks/${date.format('YYYY/MM/DD')}`)
      .push({ description: value, teacherId: this.authService.currentUser.value.id } as Task);
  }

  getTasksByDate(date: moment.Moment): Observable<Task[]> {
    return this.fireDB
      .object(`tasks/${date.format('YYYY/MM/DD')}`)
      .valueChanges()
      .pipe(map((data: any) => dbConverter(data || {}) as Task[]));
  }
}
