import React, { useState, useEffect } from "react";
import TaskAPI from "../models/TaskAPI.js";
import TaskTable from "./TaskTable.jsx";

// Hold `tasks`, `accessStatus`, `token`
// Bridge to model `TaskAPI`

// Access status:
const NOT_LOGGED_IN = "notLoggedIn";
const LOGGED_IN = "loggedIn";
const LOGIN_ERROR = "loginError";
const IS_LOADING = "isLoading";
const IS_LOADED = "isLoaded";
const LOAD_ERROR = "loadError";

function Protected({  token,
                      plList,
                  }) {
  
  const [tasks, setTasks] = useState([]);   // Store the fetched data
  const [accessStatus, setAccessStatus] = useState([LOGGED_IN]);

  const fetchTasks = async () => {
    // Fetch tasks
    const db = new TaskAPI();
    try {
      setAccessStatus(IS_LOADING);
      console.log("fetchTasks, token:", token);

      let tasksFromDB = await db.getAllTasks(token, "pos");
      console.log(tasksFromDB);

      // Make sure to have sequential pos numbers
      tasksFromDB.sort((a, b) => a.pos - b.pos).forEach((task, index) => {
        task.pos = index + 1;
      });

      setTasks(tasksFromDB); // Set the fetched tasks to the state
      console.log("### App #### Processed tasksFromDB:", tasksFromDB);
  
    } catch (error) {
      // Handle error
      //setAccessStatus(LOAD_ERROR);
    } finally {
      setAccessStatus(IS_LOADED); // Stop loading regardless of the outcome
    }
  };

  const handleCreate = async (myTask) => {
    // Create new task
    const db = new TaskAPI();
    const updatedTasks = [...tasks];  // Create a copy of tasks
    const newId = await db.createTask(token, myTask);  // Save and get new id

    let newTask ={...myTask};       // Create a copy of the new task
    newTask.id = newId;               // Set new id
    
    updatedTasks.push(newTask);
    setTasks(updatedTasks);
  };

  const handleUpdate = (myTask) => {
    // Update task with new data
    const db = new TaskAPI();
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
      const db = new TaskAPI();
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
      const db = new TaskAPI();
      updatedTasks.forEach(async (task, index) => {
        task.pos = index + 1;
        await db.updateTask(token, task.id, task); // Update each task in the database
      });
        setTasks(updatedTasks);
    }
  }

  useEffect(() => {
    fetchTasks();
    console.log("fetch Tasks");
  }, []);

  console.log("Welcome to my Protected World!");
  console.log("Token", token);
  console.log("accessStatus", accessStatus);

  return (
    <>
      { accessStatus === IS_LOADED &&
      <TaskTable 
        tasks={tasks}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleMove={handleMove}
      />
      }
      { accessStatus === IS_LOADING &&
      <div>Loading....</div>
      }
    </>
  );
}

export default Protected;
