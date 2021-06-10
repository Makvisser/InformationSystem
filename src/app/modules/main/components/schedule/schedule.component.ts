import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TaskService } from '../../../../shared/services/task.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.taskService.setTasks(null);
  }
}
