import React, { useState, useEffect } from 'react';
import Task from './Task';

// Hold: editedTask, editId

const tableStyle = {
  width: '100%',
  tableLayout: 'fixed'
}
  
const TaskTable = ({  tasks, 
                      handleCreate,
                      handleUpdate,
                      handleDelete,
                      handleMove }) => {

  const [editId, setEditId] = useState(null);
  const [editedTasks, setEditedTasks] = useState([]);
                      
  useEffect(() => {
    setEditedTasks([...tasks]); // Initialize editedTasks with a deep copy of tasks
  }, [tasks]);
  
  const handleEdit = (myTask) => {
    //id = myTask.id;
    // Cancel current edit
    if (editId) {
      const index  = editedTasks.findIndex(obj => obj.id === myTask.id);  // Index of task in edit mode
      handleCancelEdit(editedTasks[index])
    }

    setEditId(myTask.id);
  };
  
  const handleCancelEdit = (myTask) => {
    // TODO 
    setEditedTasks(tasks);
    setEditId(null);  
  };
  const onCreate = (myTask) => {
    const newTasks = editedTasks.push({id: 0});   // New task with temporary id = 0
    setEditId(0);
    // TODO:Test 
  };


  return (
    <div className="table-responsive-sm">
      <table style={tableStyle} className="table table-dark table-hover w-100">
          <colgroup>
          <col className="col-small" />
          <col className="col-small" />
          <col className="col-small" />
          <col className="col-big" />
          <col className="col-small" />
          <col className="col-small" />
          <col className="col-medium" />
          </colgroup>
          <thead>
          <tr>
              <th>ID</th>
              <th>Pos</th>
              <th>Prio</th>
              <th>Task</th>
              <th>Time</th>
              <th>Status</th>
              <th>
              Actions <button className="btn btn-sm btn-secondary" >*</button>
              </th>
          </tr>
          </thead>
          <tbody>
          {editedTasks.map(myTask => (
              <Task 
                myTask={myTask} 
                editable={editId}
                handleEdit={handleEdit}
                handleCreate={handleCreate}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                handleMove={handleMove}
              />
          ))}
          </tbody>
      </table>
      </div>
  )
};

export default TaskTable;
