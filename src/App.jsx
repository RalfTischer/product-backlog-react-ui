import React, { useState, useEffect } from "react";
import TaskAPI from "./models/TaskAPI.js";
import Protected from "./components/Protected.jsx";
import Login from "./components/Logger.jsx";

// Hold `tasks`, `accessStatus`, `token`
// Bridge to model `TaskAPI`

function App() {
  const [tasks, setTasks] = useState([]);   // Store the fetched data
  const [token, setToken] = useState("null"); // Store the received API token
  
  // Access status
  const NOT_LOGGED_IN = "notLoggedIn";
  const LOGGED_IN = "loggedIn";
  const LOGIN_ERROR = "loginError";
  const IS_LOADING = "isLoading";
  const IS_LOADED = "isLoaded";
  const LOAD_ERROR = "loadError";
  const [accessStatus, setAccessStatus] = useState(NOT_LOGGED_IN);
 
  const handleError = (error) => {
    return (
      <div>
        <div>An error occured.</div>
        <div>Error code {error.code} [{error.message}].</div>
      </div>
    )
  }

  const handleLoggedIn = (authToken) => {
    // User login
    console.log("handleLogin with authToken", authToken);
    if (authToken) {
      setAccessStatus(LOGGED_IN);
      setToken(authToken);
    } else {
      setAccessStatus(LOGIN_ERROR);
    }
  }

  
  useEffect(() => {
    console.log("accessStatus|token updated to:", accessStatus, "|", token);
  }, [accessStatus, token]);
  

  console.log("accessStatus", accessStatus);
  /*
  switch(accessStatus) {
    case NOT_LOGGED_IN: {
      return handleLogin();
    }
    case LOGGED_IN: {
      return fetchTasks();
    }
    case LOGIN_ERROR: {
      return handleError({code: 406, message: "Error when logging in"});
    }
    case IS_LOADING: {
      return handleLoading();
    }
    case IS_LOADED: {
      return openProtectedArea();
    }
    case LOAD_ERROR: {
      return handleError({code: 404, message: "Error in fetching the data from the database"});
    }
    default: {
      return handleError({code: 401, message: "Unspecified error"});
    }
  };
  */

  const db = new TaskAPI();

  return (
    <> 
      {accessStatus === NOT_LOGGED_IN && 
        <div><Login db={db} onLogin={handleLoggedIn} /></div>}
      {accessStatus === LOGIN_ERROR &&
        <div>Login Error</div>}
    </>

  );
}

export default App;
