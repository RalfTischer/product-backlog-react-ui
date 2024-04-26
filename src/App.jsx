import React, { useState, useEffect } from "react";
import TaskAPI from "./models/TaskAPI.js";
import ListsProtected from "./components/ListsProtected.jsx";
import TasksProtected from "./components/TasksProtected.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";

// Hold `accessStatus`, `token`, `listId`

// Access status:
const NOT_LOGGED_IN = "NOT_LOGGED_IN";
const LOGGED_IN = "LOGGED_IN";
const LOGIN_ERROR = "LOGIN_ERROR";
const LIST_CHOSEN ="LIST_CHOSEN"
// const IS_LOADING = "isLoading";
// const IS_LOADED = "isLoaded";
// const LOAD_ERROR = "loadError";

function App() {
  const [token, setToken] = useState("null"); // Store the received API token
  const [accessStatus, setAccessStatus] = useState(NOT_LOGGED_IN);
  const [listId, setListId] = useState(-1);

  const handleError = (error) => {
    return (
      <div>
        <div>An error occured.</div>
        <div>Error code {error.code} [{error.message}].</div>
      </div>
    )
  }

  const handleSelectList = (myList) => {
    // Choose a list
    setListId(myList.id);
    setAccessStatus(LIST_CHOSEN);
  };

  const handleList = () => {
    setListId(-1);
    setAccessStatus(LOGGED_IN);
  }

  const handleLogout = () => {
    setAccessStatus(NOT_LOGGED_IN);
    setToken('null');
  }

  const handleLoginSuccess = (authToken) => {
    // User login
    console.log("handleLogin: Reveived authToken", authToken);
    if (authToken) {
      console.log("handleLogin: Login successful");
      setAccessStatus(LOGGED_IN);
      setToken(authToken);
    } else {
      console.log("handleLogin: Login unsuccessful");
      setAccessStatus(LOGIN_ERROR);
    }
  }
  
  useEffect(() => {
    console.log("accessStatus|token updated to:", accessStatus, "|", token);
  }, [accessStatus, token]);

  const db = new TaskAPI();

  return (
    <>
      <Navbar 
        isLoggedIn={accessStatus !== NOT_LOGGED_IN}
        handleLogout={handleLogout}
        handleList={handleList}
      />
      {accessStatus === NOT_LOGGED_IN && <Login db={db} handleLoginSuccess={handleLoginSuccess} />}
      {accessStatus === LOGIN_ERROR && <div>Login Error</div>}
      {accessStatus === LOGGED_IN && <ListsProtected handleSelect={handleSelectList} token={token}/>}
      {accessStatus === LIST_CHOSEN && <TasksProtected listId={listId} token={token}/>}
    </>
  );
}

export default App;
