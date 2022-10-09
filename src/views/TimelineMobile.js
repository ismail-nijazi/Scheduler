import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaChevronRight, FaChevronLeft, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWeek, isTaskInSelectedWeek } from '../store/slices/tasks';
import TimelineTaskMobile from '../components/TimelineTaskMobile';
import Timeline from '@mui/lab/Timeline';

const getWeekNumber = (selectedDate = new Date()) => {
  const date = new Date(selectedDate);
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
};

function TimelineMobileView() {
  const tasksStore = useSelector((state) => state.tasks);
  const endOfWeek = moment(tasksStore.selectedWeek).endOf('isoWeek').toDate();
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
    } else {
      const firstDayOfNextWeek = moment(tasksStore.selectedWeek)
        .startOf('isoWeek')
        .add(7, 'days')
        .toDate();
      dispatch(setSelectedWeek(firstDayOfNextWeek));
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
        <button type="button" onClick={() => changeWeek(true)}>
          <FaChevronLeft size={16} />
        </button>
        <span className="week-number">week {getWeekNumber(tasksStore.selectedWeek)}</span>
        <button type="button" onClick={() => changeWeek()}>
          <FaChevronRight size={16} />
        </button>
      </div>
      <div className="tasks-mobile">
        {tasks.length === 0 ? (
          <div className="no-tasks">
            <span>There is not tasks in this week</span>
          </div>
        ) : (
          <Timeline position="alternate">
            {tasks.map((task) => (
              <TimelineTaskMobile task={task} key={task.id} />
            ))}
          </Timeline>
        )}
      </div>
    </div>
  );
}

export default TimelineMobileView;
