import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';
import Login from "./components/Login.jsx";
import TaskAPI from "./models/TaskAPI.js";

// Hold `tasks`, `isLoggedIn`, `token`, `isLoading`
// Bridge to model `TaskAPI`

let db; 

function App() {
  // State to store the fetched data
  const [tasks, setTasks] = useState([]);

  // State to handle the loading status
  const [isLoading, setIsLoading] = useState(false);

  // State to check login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to store the received API token
  const [token, setToken] = useState(null);

  useEffect(() => {

    // Fetch tasks from the database when the component mounts
    db = new TaskAPI();
    const fetchTasks = async () => {
      setIsLoading(true); // Start loading
      try {
        let tasksFromDB = await db.getAllTasks(token, "pos");
        console.log(tasksFromDB);

        // Make sure to have sequential pos numbers
        tasksFromDB.sort((a, b) => a.pos - b.pos).forEach((task, index) => {
          task.pos = index + 1;
        });

        setTasks(tasksFromDB); // Set the fetched tasks to the state
        // console.log("### App #### Processed tasksFromDB:", tasksFromDB);
    
      } catch (error) {
        // Handle error
        console.error('Error fetching tasks: ', error);
      } finally {
        setIsLoading(false); // Stop loading regardless of the outcome
      }
    };
    fetchTasks();
  }, [isLoggedIn, token]);
      
  const handleLogin = async (authToken) => {
    console.log("handleLogin: AuthToken received", authToken);
    setToken(prevToken => {
      console.log("handleLogin: Token set to", prevToken); // Access the previous token value
      return authToken; // Update token state
    });
    setIsLoggedIn(true);
    console.log("IsLoggedIn", isLoggedIn)
  };

  const handleCreate = async (myTask) => {
    // Create new task
    db = new TaskAPI();
    const updatedTasks = [...tasks];  // Create a copy of tasks
    const newId = await db.createTask(token, myTask);  // Save and get new id

    let newTask ={...myTask};       // Create a copy of the new task
    newTask.id = newId;               // Set new id
    
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
  };

  const handleUpdate = (myTask) => {
    // Update task with new data
    db = new TaskAPI();
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(task => task.id === myTask.id);
    if (taskIndex !== -1) {
        updatedTasks[taskIndex] = myTask;
        setTasks(updatedTasks);
        db.updateTask(myTask.id, myTask);
    }
  }
  
  const handleDelete = (myTask) => {
    // Delete task
    if (window.confirm("Really delete task " + myTask.id + " [" + myTask.task +"]?")) {
      db = new TaskAPI();
      let updatedTasks = [...tasks];
      updatedTasks = updatedTasks.filter(task => task.id !== myTask.id);
      db.deleteTask(myTask.id);
      setTasks(updatedTasks);
    };
  };

  const handleMove = (myTask, positions) => {
    // Move position of task
    // Shift position of myTask in array
    let updatedTasks = [...tasks];
    const currentIndex = updatedTasks.findIndex(task => task.id === myTask.id);
    
    if (currentIndex !== -1) {
      const newPos = updatedTasks[currentIndex].pos + positions;
      if (newPos <= 0) {
          updatedTasks[currentIndex].pos = 1;
          updatedTasks.splice(currentIndex, 1);
          updatedTasks.splice(newPos - 1, 0, myTask);
      } else if (newPos > updatedTasks.length) {
          updatedTasks[currentIndex].pos = updatedTasks.length;
      } else {
          updatedTasks.splice(currentIndex, 1);
          updatedTasks.splice(newPos - 1, 0, myTask);
      }
      // Update database
      db = new TaskAPI();
      updatedTasks.forEach(async (task, index) => {
        task.pos = index + 1;
        await db.updateTask(token, task.id, task); // Update each task in the database
      });
        setTasks(updatedTasks);
    }
  }
  
  if (isLoggedIn) {
    // Logged in
    if (isLoading) {
      // Render loading status or the fetched data
      return <div>Loading data with token {token}...</div>;
    } else {
      // Render protected main content
      return (
        <div>
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
  } else {
    // User login
    db = new TaskAPI();
    return <div><Login onLogin={handleLogin} db={db} /></div>
  }
}

export default App;
