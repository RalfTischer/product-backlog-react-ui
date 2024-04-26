import React from 'react';
import ActionButtons from './ActionButtons.jsx';

const ListDisplay = ({  myKey,
                        myList,
                        actionable,
                        handleSelect,
                        handleDelete,
                        handleMove, 
                        handleActionable, 
                        handleEdit }) => {
  
  const toggleListActions = () => {
    actionable = !actionable;
    handleActionable(myList);
  };

  const onSelect = () => {
    handleSelect(myList);
  };

  const onDelete = () => {
    handleDelete(myList);
  }
  const onMove = (positions) => {
    handleMove(myList, positions);
  }

  const onEdit = () => {
    handleEdit(myList);
  }

  return (
    <div className="list-card" key={myKey} onDoubleClick={onEdit}>
      <div className="list-info">
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

export default ListDisplay;
