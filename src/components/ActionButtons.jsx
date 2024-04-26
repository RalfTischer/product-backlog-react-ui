import React from 'react';

const ActionButtons = ({    onDelete,
                            onMove, 
                            onEdit }) => {

    const onDownwards = () => {
    // Downwards clicked
    onMove(1);
    };

    const onUpwards = () => {
    // Upwards clicked
    onMove(-1);
    };

    const onToTop = () => {
    // ToTop clicked
    onMove(-999999);
    };

    return (
      <div className="task-action">
        <button className="task-button" onClick={onEdit}>|...|</button>
        <button className="task-button" onClick={onDelete}>|←</button>
        <button className="task-button" onClick={onDownwards}>▼</button>
        <button className="task-button" onClick={onUpwards}>▲</button>
        <button className="task-button" onClick={onToTop}>▲▲</button>
      </div>
    );
}

export default ActionButtons;