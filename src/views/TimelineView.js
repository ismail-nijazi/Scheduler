import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaChevronRight, FaChevronLeft, FaPlus } from 'react-icons/fa';
import TimelineTask from '../components/TimelineTask';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWeek, isTaskInSelectedWeek } from '../store/slices/tasks';

export const getDates = (startDate, stopDate) => {
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return dateArray;
};

export const getWeekNumber = (selectedDate = new Date()) => {
  const date = new Date(selectedDate);
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
};

function TimelineView() {
  const now = new Date();
  const tasksStore = useSelector((state) => state.tasks);
  const endOfWeek = moment(tasksStore.selectedWeek).endOf('isoWeek').toDate();
  const days = getDates(tasksStore.selectedWeek, endOfWeek);
  const dispatch = useDispatch();

  const tasks = useMemo(() => {
    return tasksStore.tasks.filter((task) =>
      isTaskInSelectedWeek(task, tasksStore.selectedWeek, endOfWeek)
    );
  }, [tasksStore.tasks, endOfWeek, tasksStore.selectedWeek]);

  const changeWeek = (previous = false) => {
    if (previous) {
      const lastDayOfPreviousWeek = moment(tasksStore.selectedWeek)
        .subtract(1, 'days')
        .startOf('isoWeek')
        .toDate();
      dispatch(setSelectedWeek(lastDayOfPreviousWeek));
      console.log(lastDayOfPreviousWeek);
    } else {
      const firstDayOfNextWeek = moment(tasksStore.selectedWeek)
        .startOf('isoWeek')
        .add(7, 'days')
        .toDate();
      dispatch(setSelectedWeek(firstDayOfNextWeek));
      console.log(firstDayOfNextWeek);
    }
  };

  return (
    <div className="page-container time-line-view">
      <div className="header">
        <h3>{endOfWeek.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <div className="buttons">
          <Link to="/task/new" type="button" className="add-btn">
            <FaPlus size={20} />
          </Link>
        </div>
      </div>
      <div className="week-buttons">
        <button
          type="button"
          data-testid="previous-week-button"
          onClick={() => changeWeek(true)}>
          <FaChevronLeft size={16} />
        </button>
        <span className="week-number" data-testid="week-number">
          week {getWeekNumber(tasksStore.selectedWeek)}
        </span>
        <button type="button" data-testid="next-week-button" onClick={() => changeWeek()}>
          <FaChevronRight size={16} />
        </button>
      </div>
      <div className="days">
        {days.map((day) => (
          <span
            key={day}
            className={now.toDateString() === day.toDateString() ? 'today' : ''}>
            {day.toLocaleString('default', { day: 'numeric', weekday: 'short' })}
          </span>
        ))}
      </div>
      <div className="tasksContainer">
        {days.map((day) => (
          <div className="column" key={day} />
        ))}
        <div className="tasks">
          {tasks.map((task) => (
            <TimelineTask
              task={task}
              startOfWeek={tasksStore.selectedWeek}
              endOfWeek={endOfWeek}
              key={task.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimelineView;
