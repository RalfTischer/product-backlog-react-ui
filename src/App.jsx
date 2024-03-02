import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskAPI from "./models/TaskAPI.js";

// Hold tasks and bridge to model

function App() {
  const [tasks, setTasks] = useState([]);
  let db; 

  useEffect(() => {
  // Fetch tasks from the database when the component mounts
  db = new TaskAPI();

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
  
  
  const handleCreate = async (myTask) => {
    db = new TaskAPI();
    const updatedTasks = [...tasks];  // Create a copy of tasks
    const newId = await db.createTask(myTask);  // Save and get new id
    console.log("new id:", newId);

    let newTask ={ ... myTask};       // Create a copy of the new task
    newTask.id = newId;               // Set new id
    console.log("newTask", newTask);
    
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
    console.log("updated tasks", updatedTasks);
  };

  const handleUpdate = (myTask) => {
    db = new TaskAPI();
    console.log("handleUpdate", myTask);
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(task => task.id === myTask.id);
    if (taskIndex !== -1) {
        updatedTasks[taskIndex] = myTask;
        setTasks(updatedTasks);
        db.updateTask(myTask.id, myTask);
    }
  }
  
  const handleDelete = (myTask) => {
    if (window.confirm("Really delete task " + myTask.id + " [" + myTask.task +"]?")) {
      db = new TaskAPI();
      console.log("deleteCreate", myTask.id);
      let updatedTasks = [...tasks];
      updatedTasks = updatedTasks.filter(task => task.id !== myTask.id);
      db.deleteTask(myTask.id);
      setTasks(updatedTasks);
    };
  };

  const handleMove = (myTask, positions) => {
    console.log("handleMove", myTask, "by positions", positions);
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
