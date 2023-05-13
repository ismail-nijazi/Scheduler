import { getWeekNumber } from '../views/TimelineView';

describe('testing getWeekNumber', () => {
  it('testing date that are monday', () => {
    const date = new Date('2023-05-17');
    expect(getWeekNumber(date)).toEqual(20);
  });
  it('testing date that are in middle of a week', () => {
    const date = new Date('2023-05-20');
    expect(getWeekNumber(date)).toEqual(20);
  });
  it('testing date that are in end of the week', () => {
    const date = new Date('2023-05-20');
    expect(getWeekNumber(date)).toEqual(20);
  });
});
