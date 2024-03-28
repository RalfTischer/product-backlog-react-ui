import React from 'react';

const TaskDisplay = ({  myKey,
                        myTask,
                        handleDelete,
                        handleMove, 
                        handleEdit }) => {

  const onEdit = () => {
    // Edit clicked
    handleEdit(myTask);
  };

  const onDelete = () => {
    // Delete clicked
    console.log("Delete clicked.");
    handleDelete(myTask);
  };

  const onDownwards = () => {
    // Downwards clicked
    console.log("Downwards clicked.");
    handleMove(myTask, 1);
  };

  const onUpwards = () => {
    // Upwards clicked
    console.log("Upwards clicked.");
    handleMove(myTask, -1);
  };

  const onToTop = () => {
    // ToTop clicked
    console.log("ToTop clicked.");
    handleMove(myTask, -999999);
  };

  return (
  <div class="tasks tasks-caption">
    <div class="task-card" key={myKey} onDoubleClick={onEdit}>
      <div class="task-info">
        <div class="task-info-main">
          <div class="task-cell task-id">{myKey}</div>
          <div class="task-cell task-task">{myTask.task}</div>
        </div>
        <div class="task-info-sub">
          <div class="task-cell task-pos">{myTask.pos}</div>
          <div class="task-cell task-prio">{myTask.prio}</div>
          <div class="task-cell task-time">{myTask.time}</div>
          <div class="task-cell task-status">{myTask.status}</div>
          <div class="task-cell task-actions"><button>&#9776;</button></div>
        </div>
      </div>
      <div class="task-cell task-action-cell">
        <div class="task-action">
          <button class="task-button" onClick={onEdit}>|...|</button>
          <button class="task-button" onClick={onDelete}>|←</button>
          <button class="task-button" onClick={onDownwards}>▼</button>
          <button class="task-button" onClick={onUpwards}>▲</button>
          <button class="task-button" onClick={onToTop}>▲▲</button>
        </div>
      </div>
    </div>
  </div>
  )

  /*
  return (
    <>
      <tr key={myKey} onDoubleClick={onEdit}>
        <td>{myTask.pos} </td>
        <td>{myTask.prio} </td>
        <td>{myTask.task} </td>
        <td>{myTask.time} </td>
        <td>{myTask.status} </td>
        <td>
          <button className="btn btn-sm btn-secondary" onClick={onEdit}>|...|</button>
          <button className="btn btn-sm btn-secondary" onClick={onDelete}>|←</button>
          <button className="btn btn-sm btn-secondary" onClick={onDownwards}>▼</button>
          <button className="btn btn-sm btn-secondary" onClick={onUpwards}>▲</button>
          <button className="btn btn-sm btn-secondary" onClick={onToTop}>▲▲</button>
        </td>
      </tr>
    </>
  );
  */ 
};

export default TaskDisplay;