import React from 'react';
import TaskEdit from './TaskEdit';
import TaskDislay from './TaskDisplay';

const Task = ({ myKey,
                myTask,
                editable,
                actionable, 
                handleDelete,
                handleMove,
                handleEdit,
                handleCancelEdit,
                handleActionable, 
                handleSave
                 }) => {

  if (!myTask) {
    return null;
  }

  if (editable) {
    return <TaskEdit 
            myKey={myKey}
            myTask={myTask}
            actionable={actionable} 
            handleSave={handleSave}
            handleActionable={handleActionable} 
            handleCancelEdit={handleCancelEdit}
    />
  } else {
    return <TaskDislay
            myKey={myKey}
            myTask={myTask}
            actionable={actionable} 
            handleDelete={handleDelete}
            handleMove={handleMove}
            handleEdit={handleEdit}
            handleActionable={handleActionable} 
    />
  }
};

export default Task;
