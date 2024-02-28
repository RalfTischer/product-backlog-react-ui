import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskApi from "./models/bridge.js";

function App() {
  // TODO: Read tasks
  const tasks = TaskAPI();
  const {setEditedTasks, editedTasks} = useState(getAllTasks());
  
  const handleUpdate = (updatedTask) => {
    console.log("handleUpdate", updatedTask);
    // tasks.updateTask(updatedTask.id, updatedTask)
  };
  
  return (
    <div>
      <h1>Product Backlog</h1>
      <TaskTable tasks={editedTasks}/>
    </div>
  );
}

export default App;
