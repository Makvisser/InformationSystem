import * as moment from 'moment';

export interface Day {
  date: moment.Moment;
  active: boolean;
  disable: boolean;
  selected: boolean;
}
