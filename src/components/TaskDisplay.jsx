import React, { useState } from 'react';

const TaskDisplay = ({  myKey,
                        myTask,
                        actionable,
                        handleDelete,
                        handleMove, 
                        handleActionable, 
                        handleEdit }) => {

  /* Hamburger menu in state :                       
  screen	          small	small	big	  big
  actionable	      false	true	false	true
  task-actions	    flex	none	none	none
  task-action-cell	none	flex	flex	flex
  */
  
  const toggleTaskActions = () => {
    actionable = !actionable;
    handleActionable(myTask);
  };

  const onEdit = () => {
    // Edit clicked
    handleEdit(myTask);
  };

  const onDelete = () => {
    // Delete clicked
    handleDelete(myTask);
  };

  const onDownwards = () => {
    // Downwards clicked
    handleMove(myTask, 1);
  };

  const onUpwards = () => {
    // Upwards clicked
    handleMove(myTask, -1);
  };

  const onToTop = () => {
    // ToTop clicked
    handleMove(myTask, -999999);
  };

  return (
    <div className="task-card" key={myKey} onDoubleClick={onEdit}>
      <div className="task-info">
        <div className="task-info-main">
          <div className="task-cell task-task">{myTask.task}</div>
        </div>
        <div className="task-info-sub">
          <div className="task-cell task-pos">{myTask.pos}</div>
          <div className="task-cell task-prio">{myTask.prio}</div>
          <div className="task-cell task-time">{myTask.time}</div>
          <div className="task-cell task-status">{myTask.status}</div>
          <div className="task-cell task-actions">
            <button onClick={toggleTaskActions}>
              &#9776;
            </button>
          </div>
        </div>
      </div>
      
      <div className={`task-cell task-action-cell ${actionable ? '' : 'hide-on-small'}`}>
        <div className="task-action">
          <button className="task-button" onClick={onEdit}>|...|</button>
          <button className="task-button" onClick={onDelete}>|←</button>
          <button className="task-button" onClick={onDownwards}>▼</button>
          <button className="task-button" onClick={onUpwards}>▲</button>
          <button className="task-button" onClick={onToTop}>▲▲</button>
        </div>
      </div>
    </div>
  )

};

export default TaskDisplay;
