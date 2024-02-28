import React from 'react';
import TaskEdit from './TaskEdit';
import TaskDislay from './TaskDisplay';

const Task = ({ myTask,
                editable
}) => {
  if (!myTask) {
    return null;
  }

  // const {id, task} = myTask;

  if (editable) {
    return <TaskEdit 
            myTask={ myTask }
    />
  } else {
    return <TaskDislay
            myTask={ myTask }
    />
  }

};

export default Task;