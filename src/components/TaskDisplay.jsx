import React from 'react';

const TaskDisplay = ({ myTask
}) => {
  return (
    <>
        <tr key={myTask.id} >
        <td>{myTask.id} </td>
        <td>{myTask.pos} </td>
        <td>{myTask.prio} </td>
        <td>{myTask.task} </td>
        <td>{myTask.time} </td>
        <td>{myTask.status} </td>
        <td>
            <button>Save</button>
            <button>Cancel</button>
        </td>
        </tr>
    </>
  ); 
};

export default TaskDisplay;