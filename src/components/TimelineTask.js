import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSelectedTask } from '../store/slices/tasks';
import tasksColors,{statusColors} from '../styles/config/colors';

const COUNT_OF_HOURS_IN_WEEK = 168;
const OPTION_HOUR_MINUT = {
	hour: "2-digit",
	minute: "2-digit",
};

//Moves to stores
const STATUSES = {
	NOT_STARTED: {
		value: 0,
		text: "Not Started",
	},
	ON_GOING: {
		value: 1,
		text: "On Going",
	},
	COMPELTED:  {
		value: 2,
		text: "Compeleted",
	},
	CANCELED:  {
		value: 3,
		text: "Canceled",
	},
}

//Moves to stores
export const getStatus = (status) => {
	switch (status) {
		case STATUSES.NOT_STARTED.value:
			return {
				color: statusColors.NOT_STARTED,
				text: STATUSES.NOT_STARTED.text,
			};
		case STATUSES.ON_GOING.value:
			return {
				color: statusColors.ON_GOING,
				text: STATUSES.ON_GOING.text,
			};
		case STATUSES.COMPELTED.value:
			return {
				color: statusColors.COMPELTED,
				text: STATUSES.COMPELTED.text,
			};
		case STATUSES.CANCELED.value:
			return {
				color: statusColors.CANCELED,
				text: STATUSES.CANCELED.text,
			};
		default:
			return {
				color: statusColors.NOT_STARTED,
				text: STATUSES.NOT_STARTED.text,
			};;
	}
}

function TimelineTask({ task, startOfWeek }) {
	const dispatch = useDispatch();

  const generateRandomColor = () => {
    const colorIndex = Math.floor(Math.random() * tasksColors.length);
    return tasksColors[colorIndex];
	};
	const status = getStatus(task.status);

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
					<div className="status">
						<span className="status-text">{status.text}</span>
						<span className="status-indicator" style={
							{
								backgroundColor: status.color
							}}>
						</span>
					</div>
				</div>
			</div>
      <h5 className="text">
        {task.description.slice(0, 10)}
        ...
      </h5>
    </Link>
  );
}

export default TimelineTask;
