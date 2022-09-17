import React, { useState } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { FaChevronRight, FaChevronLeft, FaPlus } from 'react-icons/fa';
import TimelineTask from '../components/TimelineTask';

const data = [
  {
    id: 1,
    description: 'Orem ipsum dolor sit amet, consectetur adipiscing elit.',
    category_id: 0,
    starting_time: '2022-09-013 14:00:00',
    deadline: '2022-09-18 14:00:00',
    estimated_duration: 5,
		actual_duration: 8,
		status: 1,
  },
  {
    id: 2,
    description: 'Morbi id finibus augue, nec tristique elit,',
    category_id:1,
    starting_time: '2022-010-09 14:00:00',
    deadline: '2022-10-19 14:00:00',
    estimated_duration: 5,
		actual_duration: 8,
		status: 2,
  },
  {
    id: 3,
    description: 'Vivamus et accumsan tortor, vel dictum eli',
    category_id: 2,
    starting_time: '2022-09-12 15:00:00',
    deadline: '2022-09-23 15:00:00',
    estimated_duration: 5,
		actual_duration: 8,
		status: 3,
  },
];

const getDates = (startDate, stopDate) => {
  const dateArray = [];
  let currentDate = new Date(startDate);
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  }
  return dateArray;
};

const getWeekNumber = (selectedDate = new Date()) => {
  const date = new Date(selectedDate);
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate)
        / (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
};

const filterTask = (task, startOfWeek, endOfWeek) => {
  const taskStartTime = new Date(task.starting_time);
  const taskEndTime = new Date(task.deadline);

  if (taskStartTime >= startOfWeek && taskStartTime <= endOfWeek) {
    return true;
  }

  if (taskStartTime <= startOfWeek
		&& (taskEndTime >= endOfWeek || taskEndTime >= startOfWeek)) {
    return true;
  }

  return false;
};

function TimelineView() {
  const [startOfWeek, setStartOfWeek] = useState(
    moment().startOf('isoWeek').toDate(),
  );
  const endOfWeek = moment(startOfWeek).endOf('isoWeek').toDate();
  const days = getDates(startOfWeek, endOfWeek);
  const tasks = data.filter((task) => filterTask(task, startOfWeek, endOfWeek));

  const changeWeek = (previous = false) => {
    if (previous) {
      const lastDayOfPreviousWeek = moment(
        startOfWeek,
      ).subtract(1, 'days').startOf('isoWeek').toDate();
      setStartOfWeek(lastDayOfPreviousWeek);
    } else {
      const firstDayOfNextWeek = moment(
        startOfWeek,
      ).startOf('isoWeek').add(7, 'days').toDate();
      setStartOfWeek(firstDayOfNextWeek);
    }
  };

  return (
    <div className="page-container time-line-view">
      <div className="header">
        <h3>
          {endOfWeek.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
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
        <span className="week-number">
          {getWeekNumber(startOfWeek)}
        </span>
        <button type="button" onClick={() => changeWeek()}>
          <FaChevronRight size={16} />
        </button>
      </div>
      <div className="days">
        {days.map((day) => (
          <span key={day}>
            {day.toLocaleString('default', { day: 'numeric', weekday: 'short' })}
          </span>
        ))}
      </div>
      <div className="tasksContainer">
        {days.map((day) => <div className="column" key={day} />)}
        <div className="tasks">
          {tasks.map((task) => (
            <TimelineTask
              task={task}
              startOfWeek={startOfWeek}
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
