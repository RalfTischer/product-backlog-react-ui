import React, { useState, useEffect } from "react";
import TaskAPI from "../models/TaskAPI.js";
import TaskTable from "./TaskTable.jsx";

// Hold `tasks`, `accessStatus`
// Bridge to model `TaskAPI`

// Access status:
const LOGGED_IN = "LOGGED_IN";
const IS_LOADING_TASKS = "IS_LOADING_TASKS";
const IS_LOADED_TASKS = "IS_LOADED_TASKS";

function TasksProtected({ listId,
                          token,
                        }) {
  
  const [tasks, setTasks] = useState([]);   // Store the fetched tasks
  const [accessStatus, setAccessStatus] = useState([LOGGED_IN]);
  
  const fetchTasks = async () => {
    // Fetch tasks
    const db = new TaskAPI();
    try {
      setAccessStatus(IS_LOADING_TASKS);
      let tasksFromDB = await db.getAllTasks(token, listId, "pos");

      // Make sure to have sequential pos numbers
      tasksFromDB.sort((a, b) => a.pos - b.pos).forEach((task, index) => {
        task.pos = index + 1;
      });
      setTasks(tasksFromDB);
    } catch (error) {
      // Handle error
      //setAccessStatus(LOAD_ERROR);
    } finally {
      setAccessStatus(IS_LOADED_TASKS); // Stop loading regardless of the outcome
    }
  };

  const handleCreateTask = async (myTask) => {
    // Create new task in database
    try {
      const db = new TaskAPI();
      myTask.list_id = listId;
      const newId = await db.createTask(token, myTask);
      const newObject = { ...myTask, id: newId}; 
      
      setTasks([...tasks, newObject]);
    } catch (error) {
      // Handle any errors that occurred during the creation
      console.error('Error creating new item:', error);
      throw error;
    } 
  };

  const handleUpdateTask = (myTask) => {
    // Update task with new data
    const db = new TaskAPI();
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(task => task.id === myTask.id);
    if (taskIndex !== -1) {
        updatedTasks[taskIndex] = myTask;
        setTasks(updatedTasks);
        db.updateTask(token, myTask.id, myTask);
    }
  }
  
  const handleDeleteTask = (myTask) => {
    // Delete task
    if (window.confirm("Really delete task " + myTask.id + " [" + myTask.task +"]?")) {
      const db = new TaskAPI();
      let updatedTasks = [...tasks];
      updatedTasks = updatedTasks.filter(task => task.id !== myTask.id);
      db.deleteTask(token, myTask.id);
      setTasks(updatedTasks);
    };
  };

  const handleMoveTask = (myTask, positions) => {
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
    // Load tasks 
      console.log("Fetching tasks...");
      setAccessStatus(IS_LOADING_TASKS);
      fetchTasks();
  }, );

  return (
    <>
      { accessStatus === IS_LOADED_TASKS &&
      <TaskTable 
        tasks={tasks}
        listId={listId}
        handleCreate={handleCreateTask}
        handleUpdate={handleUpdateTask}
        handleDelete={handleDeleteTask}
        handleMove={handleMoveTask}
      />
      }
      { (accessStatus === IS_LOADING_TASKS) &&
      <div>Loading....</div>
      }
    </>
  );
}

export default TasksProtected;
