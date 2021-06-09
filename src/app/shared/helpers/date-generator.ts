import { Day } from '../interfaces/day';
import { Week } from '../interfaces/week';
import * as moment from 'moment';

export const generateCalendar = (now: moment.Moment) => {
  const startDate = now.clone().startOf('month').startOf('week');

  const date = startDate.clone();

  return Array(6)
    .fill(0)
    .map(
      () =>
        Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            return {
              date: value,
              active: moment().isSame(value, 'date'),
              disable: !now.isSame(value, 'month'),
              selected: now.isSame(value, 'date'),
            } as Day;
          }) as Week,
    );
};
