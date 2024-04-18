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

  const handleLogin = () => {
    // User login
    const db = new TaskAPI();
    console.log("handleLogin");
    return (
      <div><Login onLogin={handleLoggedIn} db={db} /></div>  
    );
  }

  const fetchTasks = async () => {
    // Fetch tasks
    const db = new TaskAPI();
    try {
      setAccessStatus(IS_LOADED);
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
      setAccessStatus(LOAD_ERROR);
    } finally {
      setAccessStatus(IS_LOADED); // Stop loading regardless of the outcome
    }
  };

  const handleLoading = () => {
    return <div>Loading data with token {token}...</div>;
  }

  const openProtectedArea = () => {
    return (
      <div>
        <Protected 
          tasks={tasks}
        />
      </div>
    );  
  }

  const handleLoggedIn = async (authToken) => {
    console.log("handleLoggedIn: AuthToken received", authToken);
    console.log("handleLoggedIn: current Token", token);
    console.log("handleLoggedIn: accessStatus", accessStatus);
    if (authToken) {
      console.log("Token is valid.");
      setToken(prevToken => {
        // Access the previous token value
        return authToken; // Update token state
      });
      setAccessStatus(LOGGED_IN);
    } else {
      console.log("Token is invalid.");
      setAccessStatus(LOGIN_ERROR);
    }
  };

  useEffect(() => {
    console.log("accessStatus|token updated to:", accessStatus, "|", token);
  }, [accessStatus, token]);
  

  console.log("accessStatus", accessStatus);
  
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
}

export default App;
