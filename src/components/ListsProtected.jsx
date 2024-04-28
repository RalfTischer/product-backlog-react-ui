import React, { useState, useEffect } from "react";
import TaskAPI from "../models/TaskAPI.js";
import ListTable from "./ListTable.jsx";

// Hold `lists`, `accessStatus`
// Bridge to model `TaskAPI`

// Access status:
const LOGGED_IN = "LOGGED_IN";
const IS_LOADING_LISTS = "IS_LOADING_LISTS";
const IS_LOADED_LISTS = "IS_LOADED_LISTS";

function ListsProtected({ token,
                          handleSelect,
                  }) {
  
  const [lists, setLists] = useState([]);   // Store the fetched lists
  const [accessStatus, setAccessStatus] = useState([LOGGED_IN]);

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

  const handleCreateList = async (myList) => {
    // Create new list in database
    try {
      const db = new TaskAPI();
      const newId = await db.createList(token, myList);
      const newObject = { ...myList, id: newId }; 
      setLists([...lists, newObject]);
    } catch (error) {
      // Handle any errors that occurred during the creation
      console.error('Error creating new item:', error);
      throw error;
    } 
  };

  const handleUpdateList = (myList) => {
    // Update list with new data
    const db = new TaskAPI();
    const updatedLists = [...lists];
    const listIndex = updatedLists.findIndex(list => list.id === myList.id);
    if (listIndex !== -1) {
        updatedLists[listIndex] = myList;
        setLists(updatedLists);
        db.updateList(token, myList.id, myList);
    }
  }
  
  const handleDeleteList = (myList) => {
    // Delete list
    if (window.confirm("Really delete list " + myList.id + " [" + myList.list +"]?")) {
      const db = new TaskAPI();
      let updatedLists = [...lists];
      updatedLists = updatedLists.filter(list => list.id !== myList.id);
      db.deleteList(token, myList.id);
      setLists(updatedLists);
    };
  };

  /*
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

  useEffect(() => {
    // Load lists 
    console.log("Fetching list...");
    setAccessStatus(IS_LOADING_LISTS);
    fetchLists();
  }, []);

  return (
    <>
      { accessStatus === IS_LOADED_LISTS &&
      <ListTable 
        lists={lists}
        handleSelect={handleSelect}
        handleCreate={handleCreateList}
        handleUpdate={handleUpdateList}
        handleDelete={handleDeleteList}
      />
      }
      { (accessStatus === IS_LOADING_LISTS) &&
      <div>Loading....</div>
      }
    </>
  );
}

export default ListsProtected;
