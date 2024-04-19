import React, { useState, useEffect } from "react";
import TaskAPI from "./models/TaskAPI.js";
import Protected from "./components/Protected.jsx";
import Login from "./components/Login.jsx";

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
      {accessStatus === NOT_LOGGED_IN && <Login db={db} handleLoginSuccess={handleLoginSuccess} />}
      {accessStatus === LOGIN_ERROR && <div>Login Error</div>}
      {accessStatus === LOGGED_IN && <Protected token={token} />}
    </>

  );
}

export default App;
