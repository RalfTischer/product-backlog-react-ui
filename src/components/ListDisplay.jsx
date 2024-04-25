import React, { useState } from 'react';

const ListDisplay = ({  myKey,
                        myList,
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
  
  const toggleListActions = () => {
    actionable = !actionable;
    handleActionable(myList);
  };

  const onEdit = () => {
    // Edit clicked
    handleEdit(myList);
  };

  const onDelete = () => {
    // Delete clicked
    handleDelete(myList);
  };

  const onDownwards = () => {
    // Downwards clicked
    handleMove(myList, 1);
  };

  const onUpwards = () => {
    // Upwards clicked
    handleMove(myList, -1);
  };

  const onToTop = () => {
    // ToTop clicked
    handleMove(myList, -999999);
  };

  return (
    <div className="task-card" key={myKey} onDoubleClick={onEdit}>
      <div className="task-info">
        <div className="task-info-main">
          <div className="task-cell task-task">{myList.list}</div>
        </div>
        <div className="task-info-sub">
          <div className="task-cell task-actions">
            <button className="task-button" onClick={toggleListActions}>
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

export default ListDisplay;
