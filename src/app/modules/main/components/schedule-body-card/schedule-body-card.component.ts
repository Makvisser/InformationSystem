import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Day } from '../../../../shared/interfaces/day';
import { TaskService } from '../../../../shared/services/task.service';
import { Observable } from 'rxjs';
import { Task } from '../../../../shared/interfaces/task';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';
import { DateService } from '../../../../shared/services/date.service';

@UntilDestroy()
@Component({
  selector: 'app-schedule-body-card',
  templateUrl: './schedule-body-card.component.html',
  styleUrls: ['./schedule-body-card.component.scss'],
})
export class ScheduleBodyCardComponent implements OnInit {
  @Input() day: Day;
  tasks: Task[];
  constructor(private taskService: TaskService, private dateService: DateService) {}

  ngOnInit(): void {
    this.taskService
      .getTasksByDate(this.day.date)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.tasks = data;
        this.class.active && this.taskService.setTasks(this.tasks);
      });
  }

  changeDate(): void {
    this.dateService.changeDay(this.day.date);
    this.taskService.setTasks(this.tasks);
  }

  get currentDate(): moment.Moment {
    return this.dateService.date.value;
  }

  get class() {
    return {
      active: moment().isSame(this.day.date, 'date'),
      disable: !this.currentDate.isSame(this.day.date, 'month'),
      selected: this.currentDate.isSame(this.day.date, 'date'),
    };
  }
}
