import React, { useState } from 'react';
import Task from './Task';

const tableStyle = {
  width: '100%',
  tableLayout: 'fixed'
}
  
const tableColSmall = {
  width: '10%'
}
  
const tableColMedium = {
  width: '20%'
}
  
const tableColBig = {
  width: '30%'
}

const TaskTable = ({  tasks, 
                    handleCreate,
                    handleUpdate,
                    handleDelete,
                    handleMove }) => {

  const [editId, setEditId] = useState(null);
    
  const handleEdit = (myTask) => {
    setEditId(myTask.id);
  };
  
  const onCreate = (myTask) => {
    setEditId(0);
    // TODO 
  };

    return (
      <div className="table-responsive-sm">
        <table style={tableStyle} className="table table-dark table-hover w-100">
            <colgroup>
            <col span="1" style={tableColSmall} />
            <col span="1" style={tableColSmall} />
            <col span="1" style={tableColSmall} />
            <col span="1" style={tableColBig} />
            <col span="1" style={tableColSmall} />
            <col span="1" style={tableColSmall} />
            <col span="1" style={tableColMedium} />
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
            {tasks.map(myTask => (
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
