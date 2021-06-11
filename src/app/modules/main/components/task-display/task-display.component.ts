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
import { AuthService } from '../../../../shared/services/auth.service';
import { StudentInfo } from '../../../../shared/interfaces/student-info';
import { TeacherInfo } from '../../../../shared/interfaces/teacher-info';

@UntilDestroy()
@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.scss'],
})
export class TaskDisplayComponent implements OnInit {
  textField: string = '';
  constructor(
    private dateService: DateService,
    private taskService: TaskService,
    private authService: AuthService,
  ) {}
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  ngOnInit(): void {
  }

  get date(): BehaviorSubject<moment.Moment> {
    return this.dateService.date;
  }

  get user(): StudentInfo | TeacherInfo {
    return this.authService.currentUser.value;
  }

  createNewTask(): void {
    this.textField && this.taskService.createNewTask(this.textField, this.date.value);
  }
}
