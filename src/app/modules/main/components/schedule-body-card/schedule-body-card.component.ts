import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Day } from '../../../../shared/interfaces/day';

@Component({
  selector: 'app-schedule-body-card',
  templateUrl: './schedule-body-card.component.html',
  styleUrls: ['./schedule-body-card.component.scss'],
})
export class ScheduleBodyCardComponent implements OnInit {
  @Input() day: Day;
  constructor() {}

  ngOnInit(): void {}
}
