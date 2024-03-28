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
                    handleSave,
                    handleCancelEdit }) => {

  console.log(myTask);

  const [editedTask, setEditedTask] = useState(myTask);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  }

  const onSave = () => {
    console.log("Starting save with", editedTask);
    handleSave(editedTask);
  };

  const onCancel = () => {
    handleCancelEdit(myTask);
  };

  return (
    <div key={myKey}>
      <div className="task-info">
        <div className="task-info-main">
          <div className="task-cell task-task"><input name="task" style={inputStyle} type="text" value={editedTask.task} onChange={handleInputChange} /></div>
        </div>
        <div className="task-info-sub">
          <div className="task-cell task-pos"><input name="pos" style={inputStyle} type="text" value={editedTask.pos} onChange={handleInputChange} /></div>
          <div className="task-cell task-prio"><input name="prio" style={inputStyle} type="text" value={editedTask.prio} onChange={handleInputChange} /></div>
          <div className="task-cell task-time"><input name="time" style={inputStyle} type="text" value={editedTask.time} onChange={handleInputChange} />OOO</div>
          <div className="task-cell task-status"><input name="status" style={inputStyle} type="text" value={editedTask.status} onChange={handleInputChange} /></div>
          <div className="task-cell task-actions"><button>&#9776;</button></div>
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
  
  /*
  return (
    <>
      <tr key={myKey} onSubmit={onSave}>
        <td><input name="pos" style={inputStyle} type="text" value={editedTask.pos} onChange={handleInputChange} /></td>
        <td><input name="prio" style={inputStyle} type="text" value={editedTask.prio} onChange={handleInputChange} /></td>
        <td><input name="task" style={inputStyle} type="text" value={editedTask.task} onChange={handleInputChange} /></td>
        <td><input name="time" style={inputStyle} type="text" value={editedTask.time} onChange={handleInputChange} /></td>
        <td><input name="status" style={inputStyle} type="text" value={editedTask.status} onChange={handleInputChange} /></td>
        <td>
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </td>
      </tr>
    </>
  );
  */ 
};

export default TaskEdit;
