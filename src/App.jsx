import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskApi from "./models/bridge.js";

function App() {
  // TODO: Read tasks
  const db = TaskAPI();
  const {setEditedTasks, editedTasks} = useState(db.getAllTasks());
  
  const handleUpdate = (updatedTask) => {
    console.log("handleUpdate", updatedTask);
    setEditedTasks([...editedTasks, updatedTask]);
    // tasks.updateTask(updatedTask.id, updatedTask)
  };

  const handleCreate = (updatedTask) => {
    console.log("handleCreate", updatedTask);
    // TODO: update tasks, editedTasks
    // tasks.createTask(updatedTask);
  };

  const handleDelete = (updatedTask) => {
    console.log("deleteCreate", updatedTask);
    // TODO: update tasks, editedTasks
    // tasks.deleteTask(updatedTask.id);
  };
    
  return (
    <div>
      <h1>Product Backlog</h1>
      <TaskTable tasks={editedTasks}/>
    </div>
  );
}

export default App;
