import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  date: BehaviorSubject<moment.Moment> = new BehaviorSubject<moment.Moment>(moment());
  constructor() {}

  changeDate(count: number): void {
    this.date.next(this.date.value.add(count, 'month'));
  }
  changeDay(value: moment.Moment): void {
    const newDate = this.date.value.set({ date: value.date(), month: value.month() });
    this.date.next(newDate);
  }
}
