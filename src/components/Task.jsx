import React from 'react';
import TaskEdit from './TaskEdit';
import TaskDislay from './TaskDisplay';

const Task = ({ myTask,
                editable,
                handleEdit,
                handleCreate,
                handleUpdate,
                handleDelete,
                handleMove }) => {

  if (!myTask) {
    return null;
  }

  if (editable === myTask.id) {
    return <TaskEdit 
            myTask={myTask}
            handleCreate={handleCreate}
            handleUpdate={handleUpdate}
            setEditable={setEditable}
    />
  } else {
    return <TaskDislay
            myTask={myTask}
            handleDelete={handleDelete}
            handleMove={handleMove}
            handleEdit={handleEdit}
    />
  }
};

export default Task;