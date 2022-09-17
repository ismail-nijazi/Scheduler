import React from 'react';
import { FaEdit, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSelectedTask } from '../store/slices/tasks';
import { getStatus } from "./TimelineTask";

const OPTION_DATE = {
	dateStyle: "medium"
};

function Task({ task }) {
	const status = getStatus(task.status);
	const dispatch = useDispatch();

	return (
		<div
		className="timeline-task task"
		key={task.key}>			
		<div className='row'>
			<div className='col col-2'>
				<span className="time">
				{new Date(task.starting_time).toLocaleString(
					"en-US", OPTION_DATE)}
				</span>
				<div className="status">
						<span className="status-text">{ status.text }</span>
					<span className="status-indicator" style={
						{
							backgroundColor: status.color
						}}>
					</span>
				</div>
			</div>
			<div className="col buttons">
					{
						task.status !== 2 &&
						<button
							className='btn transparent-btn'
						>
							<FaCheck size={20}/>
						</button>
					}
					<Link
						to={`/task/${task.id}`}
						onClick={() => dispatch(setSelectedTask(task))}
						className='btn transparent-btn'
				>
					<FaEdit size={20} />
				</Link>
			</div>
		</div>
		<h5 className="text">
			{task.description.slice(0, 10)}
			...
		</h5>
	</div>
	)
}

export default Task