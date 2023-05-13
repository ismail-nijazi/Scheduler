import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import TimelineView from '../views/TimelineView';
import { renderWithProviders } from '../utils/test-utils';
import { BrowserRouter } from 'react-router-dom';

describe('TimelineView', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <TimelineView></TimelineView>
      </BrowserRouter>
    );
  });
  test('Clicking next week button updates week number', () => {
    const nextWeekButton = screen.getByTestId('next-week-button');
    const weekNumber = screen.getByTestId('week-number');
    const currentWeekNumber = weekNumber.textContent;
    fireEvent.click(nextWeekButton);
    expect(weekNumber.textContent).toBe(
      `week ${parseInt(currentWeekNumber.replace('week ', '')) + 1}`
    );
  });
  test('Clicking previous week button updates week number', () => {
    const weekNumber = screen.getByTestId('week-number');
    const previousWeekButton = screen.getByTestId('previous-week-button');
    const currentWeekNumber = weekNumber.textContent;
    fireEvent.click(previousWeekButton);
    expect(weekNumber.textContent).toBe(
      `week ${parseInt(currentWeekNumber.replace('week ', '')) - 1}`
    );
  });
});
