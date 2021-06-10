import {
  AfterViewChecked, AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DateService } from '../../../../shared/services/date.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { Week } from '../../../../shared/interfaces/week';
import { Observable } from 'rxjs';
import { generateCalendar } from '../../../../shared/helpers/date-generator';

@Component({
  selector: 'app-schedule-body',
  templateUrl: './schedule-body.component.html',
  styleUrls: ['./schedule-body.component.scss'],
})
export class ScheduleBodyComponent implements OnInit, AfterViewInit {
  calendar$: Observable<Week[]> = this.dateService.date.pipe(map(generateCalendar));
  @ViewChild('element', { read: ElementRef }) divElement: ElementRef;

  @Output() heightDataEmitter: EventEmitter<number> = new EventEmitter<number>();
  constructor(private dateService: DateService) {}

  ngAfterViewInit() {
    this.heightDataEmitter.emit(this.divElement.nativeElement.clientHeight);
  }

  ngOnInit(): void {}

  changeDate(value: moment.Moment): void {
    this.dateService.changeDay(value);
  }
}
