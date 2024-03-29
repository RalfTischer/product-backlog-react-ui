import React, { useState } from 'react';
import Task from './Task';

// Hold: editId
  
const TaskTable = ({  tasks, 
                      handleCreate,
                      handleUpdate,
                      handleDelete,
                      handleMove }) => {

  const [editId, setEditId] = useState(-1);

  const handleEdit = (myTask) => {
    if (editId >= 0) {
      // Cancel current edit 
      const index  = tasks.findIndex(obj => obj.id === myTask.id);  // Index of task in edit mode
      handleCancelEdit(tasks[index]);
    }
    setEditId(myTask.id);
  };
  
  const handleCancelEdit = () => {
    // Delete task with temporary id = 0
    const index  = tasks.findIndex(obj => obj.id === 0);
    if (index > -1) {
      tasks.splice(index, 1); 
    }
    setEditId(-1);
  };
  
  const handleSave = (myTask) => {
    if (myTask.id === 0) {
      // Create new task
      handleCancelEdit(myTask);
      handleCreate(myTask);
    } else {
      // Update existing task
      handleCancelEdit(myTask);
      handleUpdate(myTask);
    }
  }

  const onCreate = () => {
    tasks.push({id: 0});
    setEditId(0);
  };

  return (
    <div className="tasks">
      <div className="task-card tasks-caption">
        <div className="task-info">
          <div className="task-info-main">
            <div className="task-cell task-task">Task</div>
          </div>
          <div className="task-info-sub">
            <div className="task-cell task-pos">Pos</div>
            <div className="task-cell task-prio">Prio</div>
            <div className="task-cell task-time">Time</div>
            <div className="task-cell task-status">Status</div>
            <div className="task-cell task-actions"><button className="task-button" onClick={onCreate}>*</button></div>
          </div>
        </div>
        <div className="task-cell task-action-cell">
          <div className="task-action">
            <button className="task-button" onClick={onCreate}>*</button>
          </div>
        </div>
      </div>

      {tasks.map(myTask => (
        <div className="task-card">
          <Task 
            key={myTask.id}
            myTask={myTask} 
            editable={editId === myTask.id}
            handleDelete={handleDelete}
            handleMove={handleMove}
            handleEdit={handleEdit}
            handleCancelEdit={handleCancelEdit}
            handleSave={handleSave}
          />
        </div>
      ))}
    </div>
  )


  /*
  return (
    <div className="table-responsive">
      <table className="table task-table table-dark table-hover w-100">
          <colgroup>
          <col className="col-small" />
          <col className="col-small" />
          <col className="col-big" />
          <col className="col-small" />
          <col className="col-small" />
          <col className="col-medium" />
          </colgroup>
          <thead className="sticky-header">
          <tr>
              <th>Pos</th>
              <th>Prio</th>
              <th>Task</th>
              <th>Time</th>
              <th>Status</th>
              <th>
              Actions <button className="btn btn-sm btn-secondary" onClick={onCreate}>*</button>
              </th>
          </tr>
          </thead>
          <tbody>
          {tasks.map(myTask => (
              <Task 
                key={myTask.id}
                myTask={myTask} 
                editable={editId === myTask.id}
                handleDelete={handleDelete}
                handleMove={handleMove}
                handleEdit={handleEdit}
                handleCancelEdit={handleCancelEdit}
                handleSave={handleSave}
              />
          ))}
          </tbody>
      </table>
    </div>
  )
  */
};

export default TaskTable;
