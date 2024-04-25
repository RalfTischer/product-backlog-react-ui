import React, { useState, useEffect } from "react";
import TaskAPI from "../models/TaskAPI.js";
import ListTable from "./ListTable.jsx";
import TaskTable from "./TaskTable.jsx";

// Hold `tasks`, `lists`, `listId`, `accessStatus`
// Bridge to model `TaskAPI`

// Access status:
const NOT_LOGGED_IN = "NOT_LOGGED_IN";
const LOGGED_IN = "LOGGED_IN";
const LOGIN_ERROR = "LOGIN_ERROR";
const IS_LOADING_TASKS = "IS_LOADING_TASKS";
const IS_LOADED_TASKS = "IS_LOADED_TASKS";
const IS_LOADING_LISTS = "IS_LOADING_LISTS";
const IS_LOADED_LISTS = "IS_LOADED_LISTS";
const LIST_CHOSEN = "LIST_CHOSEN";
const LOAD_ERROR = "LOAD_ERROR";

function Protected({  token,
                  }) {
  
  const [lists, setLists] = useState([]);   // Store the fetched lists
  const [tasks, setTasks] = useState([]);   // Store the fetched tasks
  const [listId, setListId] = useState(-1); // Store current list id
  const [accessStatus, setAccessStatus] = useState([LOGGED_IN]);
  
  /* ------------- */
  /* List handling */
  /* ------------- */
  
  const fetchLists = async () => {
    // Fetch tasks
    const db = new TaskAPI();
    try {
      setAccessStatus(IS_LOADED_LISTS);
      let listsFromDB = await db.getAllLists(token);
      console.log("lists loaded", listsFromDB);

      // Make sure to have sequential pos numbers
      listsFromDB.sort((a, b) => a.pos - b.pos).forEach((list, index) => {
        list.pos = index + 1;
      });
      setLists(listsFromDB);
    } catch (error) {
      // Handle error
      //setAccessStatus(LOAD_ERROR);
    } finally {
      setAccessStatus(IS_LOADED_LISTS); // Stop loading regardless of the outcome
    }
  };

  const handleChooseList = (myList) => {
    // Choose a list
    setListId(myList.id);
    setAccessStatus(LIST_CHOSEN);
  };

  /* TODO
  const handleCreateList = async (myTask) => {
    // Create new task in database
    try {
      const db = new TaskAPI();
      const newId = await db.createTask(token, myTask);
      const newObject = { ...myTask, id: newId }; 
      setLists([...tasks, newObject]);
    } catch (error) {
      // Handle any errors that occurred during the creation
      console.error('Error creating new item:', error);
      throw error;
    } 
  };

  const handleUpdateList = (myTask) => {
    // Update task with new data
    const db = new TaskAPI();
    const updatedLists = [...tasks];
    const taskIndex = updatedLists.findIndex(task => task.id === myTask.id);
    if (taskIndex !== -1) {
        updatedLists[taskIndex] = myTask;
        setLists(updatedLists);
        db.updateTask(myTask.id, myTask);
    }
  }
  
  const handleDeleteList = (myTask) => {
    // Delete task
    if (window.confirm("Really delete task " + myTask.id + " [" + myTask.task +"]?")) {
      const db = new TaskAPI();
      let updatedLists = [...tasks];
      updatedLists = updatedLists.filter(task => task.id !== myTask.id);
      db.deleteTask(myTask.id);
      setLists(updatedLists);
    };
  };

  const handleMoveList = (myTask, positions) => {
    // Move position of task
    // Shift position of myTask in array
    let updatedLists = [...tasks];
    const currentIndex = updatedLists.findIndex(task => task.id === myTask.id);
    
    if (currentIndex !== -1) {
      const newPos = updatedLists[currentIndex].pos + positions;
      if (newPos <= 0) {
          updatedLists[currentIndex].pos = 1;
          updatedLists.splice(currentIndex, 1);
          updatedLists.splice(newPos - 1, 0, myTask);
      } else if (newPos > updatedLists.length) {
          updatedLists[currentIndex].pos = updatedLists.length;
      } else {
          updatedLists.splice(currentIndex, 1);
          updatedLists.splice(newPos - 1, 0, myTask);
      }
      // Update database
      const db = new TaskAPI();
      updatedLists.forEach(async (task, index) => {
        task.pos = index + 1;
        await db.updateTask(token, task.id, task); // Update each task in the database
      });
        setLists(updatedLists);
    }
  }
  */

  /* ------------- */
  /* Task handling */
  /* ------------- */

  const fetchTasks = async () => {
    // Fetch tasks
    const db = new TaskAPI();
    try {
      setAccessStatus(IS_LOADING_TASKS);
      let tasksFromDB = await db.getAllTasks(token, listId, "pos");
      console.log("tasks loaded", tasksFromDB);

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
      const newId = await db.createTask(token, myTask);
      const newObject = { ...myTask, id: newId }; 
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
        db.updateTask(myTask.id, myTask);
    }
  }
  
  const handleDeleteTask = (myTask) => {
    // Delete task
    if (window.confirm("Really delete task " + myTask.id + " [" + myTask.task +"]?")) {
      const db = new TaskAPI();
      let updatedTasks = [...tasks];
      updatedTasks = updatedTasks.filter(task => task.id !== myTask.id);
      db.deleteTask(myTask.id);
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
    // Load lists of tasks according to status
    console.log("accessStatus changed to", accessStatus);
    if (accessStatus == LOGGED_IN) {
      console.log("fetching list...");
      setAccessStatus(IS_LOADING_LISTS);
      fetchLists();
    } else if (accessStatus == LIST_CHOSEN) {
      console.log("fetching tasks...");
      setAccessStatus(IS_LOADING_TASKS);
      fetchTasks();
    }
  }, [accessStatus]);

  return (
    <>
      { accessStatus == IS_LOADED_LISTS &&
      <ListTable 
        lists={lists}
      />
      }
      { accessStatus == IS_LOADED_TASKS &&
      <TaskTable 
        tasks={tasks}
        listId={listId}
        handleCreate={handleCreateTask}
        handleUpdate={handleUpdateTask}
        handleDelete={handleDeleteTask}
        handleMove={handleMoveTask}
      />
      }
      { (accessStatus == IS_LOADING_TASKS || accessStatus == IS_LOADING_LISTS) &&
      <div>Loading....</div>
      }
    </>
  );
}

export default Protected;

        /* handleChoose={handleChooseList}
        handleCreate={handleCreateList}
        handleUpdate={handleUpdateList}
        handleDelete={handleDeleteList}
        handleMove={handleMoveList} */

