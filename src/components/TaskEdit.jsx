import React from 'react';

const TaskEdit = ({ myTask
}) => {

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box'
  }

  return (
    <>
        <tr key={myTask.id} >
        <td>{myTask.id}</td>
        <td><input name="pos" style={inputStyle} type="text" value={myTask.pos} /></td>
        <td><input name="prio" style={inputStyle} type="text" value={myTask.prio} /></td>
        <td><input name="task" style={inputStyle} type="text" value={myTask.task} /></td>
        <td><input name="time" style={inputStyle} type="text" value={myTask.time} /></td>
        <td><input name="status" style={inputStyle} type="text" value={myTask.status} on/></td>
        <td>
            <button >Save</button>
            <button >Cancel</button>
        </td>
        </tr>
    </>
  ); 
};

export default TaskEdit;