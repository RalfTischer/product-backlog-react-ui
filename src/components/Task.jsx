import React from 'react';
import TaskEdit from './TaskEdit';
import TaskDislay from './TaskDisplay';

const Task = ({ myKey,
                myTask,
                editable,
                handleDelete,
                handleMove,
                handleEdit,
                handleCancelEdit,
                handleSave
                 }) => {

  if (!myTask) {
    return null;
  }

  if (editable) {
    return <TaskEdit 
            myKey={myKey}
            myTask={myTask}
            handleSave={handleSave}
            handleCancelEdit={handleCancelEdit}
    />
  } else {
    return <TaskDislay
            myKey={myKey}
            myTask={myTask}
            handleDelete={handleDelete}
            handleMove={handleMove}
            handleEdit={handleEdit}
    />
  }
};

export default Task;