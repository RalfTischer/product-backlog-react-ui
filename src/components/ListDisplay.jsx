import React from 'react';

const ListDisplay = ({  myKey,
                        myList,
                        actionable,
                        handleDelete,
                        handleMove, 
                        handleActionable, 
                        handleEdit }) => {
  
  const toggleListActions = () => {
    actionable = !actionable;
    handleActionable(myList);
  };

  const onSelect = () => {
    // TODO
    console.log("Select detected for list", myList.id);
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
    <div className="list-card" key={myKey} onDoubleClick={onEdit}>
      <div className="task-info">
        <div className="list-cell list-list">{myList.list}</div>
        <div className="list-cell list-actions">
          <button className="task-button" onClick={toggleListActions}>
            &#9776;
          </button>
          <button className="task-button" onClick={onSelect}>
            Select
          </button>

      </div>
      </div>
      
      <div className={`list-cell task-action-cell ${actionable ? '' : 'hide-on-small'}`}>
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
