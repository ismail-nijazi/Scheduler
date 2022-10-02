import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTask } from '../store/slices/tasks';
import {colors} from '../styles/config/colors';

const COUNT_OF_HOURS_IN_WEEK = 168;
const OPTION_HOUR_MINUT = {
	hour: "2-digit",
	minute: "2-digit",
};

function TimelineTask({ task, startOfWeek }) {
	const tasksStore = useSelector(state => state.tasks)
	const dispatch = useDispatch();
	const diff = Math.floor(Math.abs(task.deadline - task.starting_time) / 3600000);
	
  const getTaskStyleWeek = () => {
    const taskStartTime = new Date(task.starting_time);
		const taskDeadline = new Date(task.deadline);
		const taksProject = tasksStore.usersProjects.find(
			project => project.id === task.project
		);
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
      backgroundColor: taksProject ? taksProject.color : colors.defaultProject,
		};
		
	};

  return (
		<Link
			to={`/task/${task.id}`}
			className="timeline-task"
      style={getTaskStyleWeek(task)}
			key={task.id}
			onClick={() => dispatch(setSelectedTask(task))}
		>
			{diff > 12 ? <>
				<div className='row'>
					<div className='col'>
						<span className="time">
						{new Date(task.starting_time).toLocaleString(
							"en-US", OPTION_HOUR_MINUT)}
						</span>
					</div>
				</div>
				<h5 className="text">
					{task.description.length > 15 ?
						`${task.description.slice(0, 15)}...`: task.description}
				</h5>
			</> :
			<div className="row" style={{height: 50}}></div>}
    </Link>
  );
}

export default TimelineTask;
