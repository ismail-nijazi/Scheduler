import React from 'react';
import tasksColors from '../styles/tasksColors';

const COUNT_OF_HOURS_IN_WEEK = 168;

function TimelineTask({ task, startOfWeek }) {
  const generateRandomColor = () => {
    const colorIndex = Math.floor(Math.random() * tasksColors.length);
    return tasksColors[colorIndex];
  };

  const getTaskStyle = () => {
    const taskStartTime = new Date(task.starting_time);
    const taskDeadline = new Date(task.deadline);
    let startLeft = 0;
    let startToEndHours = (Math.abs(
      startOfWeek - taskDeadline,
    ) / 36e5) / COUNT_OF_HOURS_IN_WEEK;

    if (taskStartTime >= startOfWeek) {
      startToEndHours = (Math.abs(
        taskStartTime - taskDeadline,
      ) / 36e5) / COUNT_OF_HOURS_IN_WEEK;
      startLeft = (Math.abs(
        taskStartTime - startOfWeek,
      ) / 36e5) / COUNT_OF_HOURS_IN_WEEK;
    }

    return {
      marginLeft: `${startLeft * 100}%`,
      width: `${startToEndHours * 100}%`,
      backgroundColor: generateRandomColor(),
    };
  };

  return (
    <div
      className="task"
      style={getTaskStyle(task)}
      key={task.id}
    >
      <h5 className="text">
        {task.description.slice(0, 10)}
        ...
      </h5>
    </div>
  );
}

export default TimelineTask;
