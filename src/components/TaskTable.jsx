import React from 'react';
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

  const TaskTable = ({ tasks }) => {
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
            {tasks.map(mytask => (
                <Task 
                  mytask={ mytask } 
                  editable = { false }
                />
            ))}
            </tbody>
        </table>
        </div>
    )
};

export default TaskTable;
