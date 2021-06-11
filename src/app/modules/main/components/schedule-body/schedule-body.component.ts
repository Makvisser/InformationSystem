import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DateService } from '../../../../shared/services/date.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import * as moment from 'moment';
import { Week } from '../../../../shared/interfaces/week';
import { Observable } from 'rxjs';
import { generateCalendar } from '../../../../shared/helpers/date-generator';

@Component({
  selector: 'app-schedule-body',
  templateUrl: './schedule-body.component.html',
  styleUrls: ['./schedule-body.component.scss'],
})
export class ScheduleBodyComponent implements OnInit {
  calendar$: Observable<Week[]> = this.dateService.date.pipe(
    distinctUntilChanged((prev, curr) => prev.isSame(curr, 'month')),
    map(generateCalendar),
  );
  constructor(private dateService: DateService) {}

  ngOnInit(): void {}
}
