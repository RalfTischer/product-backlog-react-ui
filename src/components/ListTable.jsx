import React, { useState } from 'react';
import Task from './Task';

// Hold: editId, actionId
  
const TaskTable = ({  tasks: lists, 
                      handleCreate,
                      handleUpdate,
                      handleDelete,
                      handleMove }) => {

  const [editId, setEditId] = useState(-1);
  const [actionId, setActionId] = useState(-1);

  const handleEdit = (myTask) => {
    if (editId >= 0) {
      // Cancel current edit 
      const index  = lists.findIndex(obj => obj.id === myTask.id);  // Index of task in edit mode
      handleCancelEdit(lists[index]);
    }
    setEditId(myTask.id);
  };
  
  const handleCancelEdit = () => {
    // Delete task with temporary id = 0
    const index  = lists.findIndex(obj => obj.id === 0);
    if (index > -1) {
      lists.splice(index, 1); 
    }
    setEditId(-1);
  };

  const handleActionable = (myTask) => {
    // Set one task actionable or withdraw actionable 
    if (actionId === myTask.id) {
      setActionId(-1);
    } else {
      setActionId(myTask.id);
    } 
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
    lists.push({id: 0});
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
        <hr className="task-line-caption"></hr>
      </div>

      {lists.map(myTask => (
        <div className="task-card">
          <Task 
            key={myTask.id}
            myTask={myTask} 
            editable={editId === myTask.id}
            actionable={actionId === myTask.id}
            handleDelete={handleDelete}
            handleMove={handleMove}
            handleEdit={handleEdit}
            handleCancelEdit={handleCancelEdit}
            handleActionable={handleActionable} 
            handleSave={handleSave}
          />
        </div>
      ))}
    </div>
  )
};

export default TaskTable;
