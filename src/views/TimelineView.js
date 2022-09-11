import React, { useState } from 'react';
import * as moment from "moment";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import TimelineTask from '../components/TimelineTask';

const data = [
  {
    id: 1,
    description: 'Orem ipsum dolor sit amet, consectetur adipiscing elit.',
    category: 'cat_1',
    starting_time: "2022-09-09 14:00:00",
    deadline: "2022-09-10 14:00:00",
    estimated_duration: 5,
    actual_duration: 8
  },
  {
    id: 2,
    description: 'Morbi id finibus augue, nec tristique elit,',
    category: 'cat_1',
    starting_time: "2022-010-09 14:00:00",
    deadline: "2022-10-19 14:00:00",
    estimated_duration: 5,
    actual_duration: 8
  },
  {
    id: 3,
    description:
		'Vivamus et accumsan tortor, vel dictum eli',
    category: 'cat_2',
    starting_time: "2022-09-06 15:00:00",
    deadline: "2022-09-12 15:00:00",
    estimated_duration: 5,
    actual_duration: 8
  }
];


const getDates = (startDate, stopDate)=>{
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
    return dateArray;
}

const filterTask = (task, startOfWeek, endOfWeek) => {
	const taskStartTime = new Date(task.starting_time);
	const taskEndTime = new Date(task.deadline)

	if ( taskStartTime >= startOfWeek && taskStartTime <= endOfWeek) {
		return true;
	}

	if (taskStartTime <= startOfWeek &&
		(taskEndTime >= endOfWeek || taskEndTime >= startOfWeek)) {
		return true;
	}

	return false;
}

function TimelineView() {
	const [startOfWeek, setStartOfWeek] = useState(
		moment().startOf("isoWeek").toDate()
	);
	const endOfWeek = moment(startOfWeek).endOf("isoWeek").toDate();
	const days = getDates(startOfWeek, endOfWeek);
	const tasks = data.filter(task => filterTask(task, startOfWeek, endOfWeek));

	const changeWeek = (previous=false) => {
		if (previous) {
			const lastDayOfPreviousWeek = moment(
				startOfWeek).subtract(1, 'days').startOf("isoWeek").toDate();
			setStartOfWeek(lastDayOfPreviousWeek);
		} else {
			const firstDayOfNextWeek = moment(
				startOfWeek).startOf("isoWeek").add(7, 'days').toDate();
			setStartOfWeek(firstDayOfNextWeek);
		}
	}

  return (
		<div className="container">
      <div className="header">
				<h3>{endOfWeek.toLocaleString(
					'default', { month: 'long', year: "numeric" })}
				</h3>
				<div className="buttons">
					<button type="button" onClick={() => changeWeek(true)}>
						<FaChevronLeft size={16} />
					</button>
					<button type="button" onClick={() => changeWeek()}>
						<FaChevronRight size={ 16 }/>
					</button>
				</div>
		  </div>
			  <div className="days">
				{days.map(day =>
					<span key={day}>{
						day.toLocaleString(
						'default', { day: 'numeric', weekday: 'short'})
					}
					</span>)}
			  </div>
				<div className="tasksContainer">
					{days.map(day => <div className="column" key={day} />)}
					<div className="tasks">
						{tasks.map((task) => <TimelineTask
							task={task}
							startOfWeek={startOfWeek}
							endOfWeek={endOfWeek}
							key={task.id}
						/>)	
						}
					</div>
		  	</div>
    </div>
  );
}

export default TimelineView;
