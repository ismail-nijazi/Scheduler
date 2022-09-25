import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSelectedTask } from '../store/slices/tasks';

const COUNT_OF_HOURS_IN_WEEK = 168;
const OPTION_HOUR_MINUT = {
	hour: "2-digit",
	minute: "2-digit",
};

function TimelineTask({ task, startOfWeek }) {
	const dispatch = useDispatch();

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
      backgroundColor: task.color,
		};
		
  };

  return (
		<Link
			to={`/task/${task.id}`}
			className="timeline-task"
      style={getTaskStyle(task)}
			key={task.id}
			onClick={() => dispatch(setSelectedTask(task))}
		>
			<div className='row'>
				<div className='col'>
					<span className="time">
					{new Date(task.starting_time).toLocaleString(
						"en-US", OPTION_HOUR_MINUT)}
					</span>
				</div>
			</div>
      <h5 className="text">
        {task.description.slice(0, 15)}
        ...
      </h5>
    </Link>
  );
}

export default TimelineTask;
