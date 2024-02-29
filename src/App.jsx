import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskAPI from "./models/TaskAPI.js";

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
  
  
  const handleCreate = (updatedTask) => {
    console.log("handleCreate", updatedTask);
    let updatedTasks = [...tasks];
    updatedTasks.push(updatedTask);
    // tasks.createTask(updatedTask);
    setTasks(updatedTasks);
  };

  const handleUpdate = (updatedTask) => {
    console.log("handleUpdate", updatedTask);
    let updatedTasks = [...tasks];
    const updateIndex = updatedTasks.findIndex(task => task.id === updatedTask.id);
    if (updateIndex !== -1) {
      updatedTasks[updateIndex] = updatedTask;
    }
    // tasks.updateTask(updatedTask.id, updatedTask)
    setTasks(updatedTasks);
  };

  const handleDelete = (updatedTask) => {
    console.log("deleteCreate", updatedTask);
    let updatedTasks = [...tasks];
    updatedTasks = updatedTasks.filter(task => task.id !== updatedTask.id);
    // tasks.deleteTask(updatedTask.id);
    setTasks(updatedTasks);
  };

  const handleMove = (task, positions) => {
    console.log("handleMove", task, "by positions", positions);
  }
    
  return (
    <div>
      <h1>Product Backlog</h1>
      <TaskTable 
        tasks={tasks}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleMove={handleMove}
      />
    </div>
  );
}

export default App;
