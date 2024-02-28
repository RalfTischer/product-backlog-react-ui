import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskApi from "./models/bridge.js";

function App() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
  // Fetch tasks from the database when the component mounts
  const db = new TaskAPI();
  const fetchTasks = async () => {
    try {
      const tasksFromDB = await db.getAllTasks();
      setTasks(tasksFromDB); // Set the fetched tasks to the state
      console.log("### App #### tasksFromDB:", tasksFromDB);
    } catch (error) {
      // Handle error
      console.error('Error fetching tasks: ', error);
    }
  };

  fetchTasks();
}, []);
  
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
