import React, { useState } from 'react';

const TaskEdit = ({ myTask,
                    handleCreate,
                    handleUpdate,
                    setEditable }) => {

  const [editedTask, setEditedTask] = useState(myTask);
  
  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  }

  const onSave = () => {
    // TODO
    handleCreate(editedTask);
    setEditable(null);
  };

  const onCancel = () => {
    // TODO
    setEditable(null);
  };


  return (
    <>
      <tr key={myTask.id} >
      <td>{myTask.id}</td>
      <td><input name="pos" style={inputStyle} type="text" value={myTask.pos} onChange={handleInputChange} /></td>
      <td><input name="prio" style={inputStyle} type="text" value={myTask.prio} onChange={handleInputChange} /></td>
      <td><input name="task" style={inputStyle} type="text" value={myTask.task} onChange={handleInputChange} /></td>
      <td><input name="time" style={inputStyle} type="text" value={myTask.time} onChange={handleInputChange} /></td>
      <td><input name="status" style={inputStyle} type="text" value={myTask.status} onChange={handleInputChange} /></td>
      <td>
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
      </td>
      </tr>
    </>
  ); 
};

export default TaskEdit;