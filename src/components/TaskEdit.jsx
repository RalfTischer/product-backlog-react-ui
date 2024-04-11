import React, { useState } from 'react';

// Hold editedTask

const inputStyle = {
  /*
  width: '100%',
  boxSizing: 'border-box'
  */
}

const TaskEdit = ({ myKey,
                    myTask,
                    actionable,
                    handleActionable,
                    handleSave,
                    handleCancelEdit }) => {

  console.log(myTask);

  const [editedTask, setEditedTask] = useState(myTask);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  }

  const toggleTaskActions = () => {
    actionable = !actionable;
    handleActionable(myTask);
  };

  const onSave = () => {
    console.log("Starting save with", editedTask);
    handleSave(editedTask);
  };

  const onCancel = () => {
    handleCancelEdit(myTask);
  };

  return (
    <div className="task-card" key={myKey}>
      <div className="task-info">
        <div className="task-info-main">
          <div className="task-cell task-task"><input name="task" type="text" value={editedTask.task} onChange={handleInputChange} /></div>
        </div>
        <div className="task-info-sub">
          <div className="task-cell task-pos"><input name="pos" type="text" value={editedTask.pos} onChange={handleInputChange} /></div>
          <div className="task-cell task-prio"><input name="prio" type="text" value={editedTask.prio} onChange={handleInputChange} /></div>
          <div className="task-cell task-time"><input name="time" type="text" value={editedTask.time} onChange={handleInputChange} /></div>
          <div className="task-cell task-status"><input name="status" type="text" value={editedTask.status} onChange={handleInputChange} /></div>
          <div className="task-cell task-actions">
            <button onClick={toggleTaskActions}>
              &#9776;
            </button>
          </div>
        </div>
      </div>

      <div className="task-cell task-action-cell">
        <div className="task-action">
          <button className="task-button" onClick={onSave}>Save</button>
          <button className="task-button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
};

export default TaskEdit;
