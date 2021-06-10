import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateService } from '../../../../shared/services/date.service';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { TaskService } from '../../../../shared/services/task.service';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { Task } from '../../../../shared/interfaces/task';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.scss'],
})
export class TaskDisplayComponent implements OnInit {
  @Input() height: string | number;
  textField: string = '';
  constructor(private dateService: DateService, private taskService: TaskService) {}
  tasks$: Observable<Task[]> = this.dateService.date.pipe(
    tap(() => (this.textField = '')),
    switchMap((date) => this.taskService.getTasksByDate(date)),
    untilDestroyed(this),
  );

  ngOnInit(): void {}

  get date(): BehaviorSubject<moment.Moment> {
    return this.dateService.date;
  }

  createNewTask(): void {
    this.textField && this.taskService.createNewTask(this.textField, this.date.value);
  }
}
