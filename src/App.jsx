import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import TaskAPI from "./models/TaskAPI.js";

// Hold `tasks` 
// Bridge to model `TaskAPI`

let db; 

function App() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
  // Fetch tasks from the database when the component mounts
  db = new TaskAPI();
  const fetchTasks = async () => {
    try {
      let tasksFromDB = await db.getAllTasks("pos");

      // Make sure to have sequential pos numbers
      tasksFromDB.sort((a, b) => a.pos - b.pos).forEach((task, index) => {
        task.pos = index + 1;
      });

      setTasks(tasksFromDB); // Set the fetched tasks to the state
      // console.log("### App #### Processed tasksFromDB:", tasksFromDB);
  
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

    let updatedTasks = [...tasks];
    const currentIndex = updatedTasks.findIndex(task => task.id === myTask.id);
    if (currentIndex !== -1) {
      const newPos = updatedTasks[currentIndex].pos + positions;
      if ((positions === 0) || (newPos <= 0)) {
          updatedTasks[currentIndex].pos = 1;
      } else if (newPos > updatedTasks.length) {
          updatedTasks[currentIndex].pos = updatedTasks.length;
      } else {
          updatedTasks.splice(currentIndex, 1);
          updatedTasks.splice(newPos - 1, 0, myTask);
      }
      console.log("updatedTasks before db", updatedTasks);

      // Update database
      db = new TaskAPI();
      updatedTasks.forEach(async (task, index) => {
        task.pos = index + 1;
        await db.updateTask(task.id, task); // Update each task in the database
      });
        console.log("updatedTasks after db", updatedTasks);
        setTasks(updatedTasks);
    }
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
