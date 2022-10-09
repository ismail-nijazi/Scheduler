import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedTask } from '../store/slices/tasks';
import { colors } from '../styles/config/colors';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const OPTION_HOUR_MINUT = {
  weekday: 'short',
  hour: '2-digit',
  minute: '2-digit'
};

function TimelineTaskMobile({ task }) {
  const navigate = useNavigate();
  const tasksStore = useSelector((state) => state.tasks);
  const taksProject = tasksStore.usersProjects.find(
    (project) => project.id === task.project
  );
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(setSelectedTask(task));
    navigate(`/task/${task.id}`);
  };

  return (
    <TimelineItem
      key={task.id}
      onClick={onClick}
      sx={{
        cursor: 'pointer'
      }}
    >
      <TimelineOppositeContent color="text.secondary">
        {
          <span className="time">
            {new Date(task.starting_time).toLocaleString('en-US', OPTION_HOUR_MINUT)}
          </span>
        }
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            backgroundColor: taksProject ? taksProject.color : colors.defaultProject
          }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        {' '}
        {task.description.length > 15
          ? `${task.description.slice(0, 15)}...`
          : task.description}
      </TimelineContent>
    </TimelineItem>
  );
}

export default TimelineTaskMobile;
