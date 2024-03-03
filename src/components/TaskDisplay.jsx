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
};

export default TaskDisplay;