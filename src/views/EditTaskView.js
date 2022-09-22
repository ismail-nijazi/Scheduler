import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Select, MenuItem } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FaTimes } from 'react-icons/fa';
import styles from '../styles/config/material_ui';
import moment from 'moment';

const INITIAL_TASK = {
  description: '',
  category_id: 0,
  starting_time: new moment(),
  deadline: new moment(),
  estimated_duration: 1
};

function EditTaskView() {
  const navigate = useNavigate();
  const isNewTask = useLocation().pathname.includes('new');
  const task = useSelector((state) => state.tasks.selectedTask);
  const [newTask, setTask] = useState(isNewTask ? INITIAL_TASK : task);
  const taskStore = useSelector((state) => state.tasks);

  return (
    <div className={'modal'}>
      <div className="edit-task">
        <div className="head">
          <span className="title">{isNewTask ? 'Add a new' : 'Update the'} task</span>
          <button
            type="button"
            className="btn transparent-btn close-btn"
            onClick={() => navigate(-1)}>
            <FaTimes size={26} />
          </button>
        </div>
        <div className="content">
          <div className="row">
            <div className="col">
              <label htmlFor="description">Description</label>
              <textarea
                value={newTask.description}
                onChange={(event) =>
                  setTask({
                    ...newTask,
                    description: event.target.value
                  })
                }
                name="description"
                id="description"
                placeholder="Description"
                rows={6}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label id="task-category">Project</label>
              <Select
                labelId="task-category"
                id="task-category-select"
                value={newTask.category_id}
                label="Project"
                onChange={(event) =>
                  setTask({
                    ...newTask,
                    category_id: event.target.value
                  })
                }
                className="select">
                <MenuItem sx={styles.menuItem} value={0}>
                  No Category
                </MenuItem>
                <MenuItem sx={styles.menuItem} value={1}>
                  BTH
                </MenuItem>
                <MenuItem sx={styles.menuItem} value={2}>
                  Work
                </MenuItem>
              </Select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Start date</span>
              <DateTimePicker
                value={newTask.starting_time}
                onChange={(newValue) =>
                  setTask({
                    ...newTask,
                    starting_time: newValue
                  })
                }
                renderInput={(params) => <TextField {...params} />}
                className="date-picker"
              />
            </div>
            <div className="col">
              <span>Deadline</span>
              <DateTimePicker
                value={newTask.deadline}
                onChange={(newValue) =>
                  setTask({
                    ...newTask,
                    deadline: newValue
                  })
                }
                renderInput={(params) => <TextField {...params} />}
                className="date-picker"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span>Duration(hours)</span>
              <input
                className="input"
                type="number"
                name="duration"
                id="duration"
                value={newTask.estimated_duration}
                onChange={(event) =>
                  setTask({
                    ...newTask,
                    estimated_duration: event.target.value
                  })
                }
              />
            </div>
          </div>
          <div className="row footer">
            <div className="col">
              <button type="button" className="btn primary-btn">
                {isNewTask ? 'Add' : 'Update'}
              </button>
              {!isNewTask && (
                <button type="button" className="btn danger-btn">
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTaskView;
