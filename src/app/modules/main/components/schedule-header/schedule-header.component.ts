import { Component, OnInit } from '@angular/core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { DateService } from '../../../../shared/services/date.service';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-header',
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss'],
})
export class ScheduleHeaderComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  constructor(private dateService: DateService) {}

  ngOnInit(): void {}

  get date(): BehaviorSubject<moment.Moment> {
    return this.dateService.date;
  }

  changeScheduleDate(count: number): void {
    this.dateService.changeDate(count);
  }
}
