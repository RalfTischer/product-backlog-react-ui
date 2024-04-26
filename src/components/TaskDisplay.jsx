import React from 'react';
import ActionButtons from './ActionButtons.jsx';

const TaskDisplay = ({  myKey,
                        myTask,
                        actionable,
                        handleDelete,
                        handleMove, 
                        handleActionable, 
                        handleEdit }) => {
  
  const toggleTaskActions = () => {
    actionable = !actionable;
    handleActionable(myTask);
  };

  const onDelete = () => {
    handleDelete(myTask);
  }
  const onMove = (positions) => {
    handleMove(myTask, positions);
  }

  const onEdit = () => {
    handleEdit(myTask);
  }

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
            <button className="task-button" onClick={toggleTaskActions}>
              &#9776;
            </button>
          </div>
        </div>
      </div>
      
      <div className={`task-cell task-action-cell ${actionable ? '' : 'hide-on-small'}`}>
        <ActionButtons 
          onDelete={onDelete}
          onMove={onMove}
          onEdit={onEdit}
        />
      </div>
    </div>
  )

};

export default TaskDisplay;
