import { Component, OnInit } from '@angular/core';
import { DateService } from '../../../../shared/services/date.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Day } from '../../../../shared/interfaces/day';
import { Week } from '../../../../shared/interfaces/week';
import { Observable } from 'rxjs';
import { generateCalendar } from '../../../../shared/helpers/date-generator';

@Component({
  selector: 'app-schedule-body',
  templateUrl: './schedule-body.component.html',
  styleUrls: ['./schedule-body.component.scss'],
})
export class ScheduleBodyComponent implements OnInit {
  calendar$: Observable<Week[]> = this.dateService.date.pipe(map(generateCalendar));
  constructor(private dateService: DateService) {}

  ngOnInit(): void {}
}
