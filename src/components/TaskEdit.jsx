import React, { useState } from 'react';

const inputStyle = {
  width: '100%',
  boxSizing: 'border-box'
}

const TaskEdit = ({ myTask,
                    handleSave,
                    handleCancelEdit }) => {

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
    <>
      <tr key={editedTask.id} >
      <td>{editedTask.id}</td>
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
};

export default TaskEdit;