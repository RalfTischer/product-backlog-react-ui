import React, { useState } from 'react';

// Hold editedList

const ListEdit = ({ myKey,
                    myList,
                    actionable,
                    handleActionable,
                    handleSave,
                    handleCancelEdit }) => {

  // console.log(myList);

  const [editedList, setEditedList] = useState(myList);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedList({ ...editedList, [name]: value });
  }

  const toggleListActions = () => {
    actionable = !actionable;
    handleActionable(myList);
  };

  const onSave = () => {
    console.log("Starting save with", editedList);
    handleSave(editedList);
  };

  const onCancel = () => {
    handleCancelEdit(myList);
  };

  return (
    <div className="task-card" key={myKey}>
      <div className="task-info">
        <div className="task-info-main">
          <div className="task-cell task-task"><textarea name="task" type="text" value={editedList.list} onChange={handleInputChange}></textarea></div>
        </div>
        <div className="task-info-sub">
          <div className="task-cell task-actions">
            <button onClick={toggleListActions}>
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

export default ListEdit;
