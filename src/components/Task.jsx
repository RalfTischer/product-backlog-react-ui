import React from 'react';
import TaskEdit from './TaskEdit';
import TaskDislay from './TaskDisplay';

const Task = ({ myTask,
                editable,
                handleEdit,
                handleCancelEdit,
                handleSave,
                handleDelete,
                handleMove }) => {

  if (!myTask) {
    return null;
  }

  if (editable) {
    return <TaskEdit 
            myTask={myTask}
            handleSave={handleSave}
            handleCancelEdit={handleCancelEdit}
    />
  } else {
    return <TaskDislay
            myTask={myTask}
            handleDelete={handleDelete}
            handleMove={handleMove}
            handleEdit={handleEdit}
            handleSave={handleSave}
    />
  }
};

export default Task;