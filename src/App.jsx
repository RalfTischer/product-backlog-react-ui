import React, { useState, useEffect } from "react";
import TaskAPI from "./models/TaskAPI.js";
import Protected from "./components/Protected.jsx";
import Login from "./components/Login.jsx";
import Navbar from "./components/Navbar.jsx";

// Hold `accessStatus`, `token`

// Access status:
const NOT_LOGGED_IN = "notLoggedIn";
const LOGGED_IN = "loggedIn";
const LOGIN_ERROR = "loginError";
// const IS_LOADING = "isLoading";
// const IS_LOADED = "isLoaded";
// const LOAD_ERROR = "loadError";

function App() {
  const [token, setToken] = useState("null"); // Store the received API token
  const [accessStatus, setAccessStatus] = useState(NOT_LOGGED_IN);

  const handleError = (error) => {
    return (
      <div>
        <div>An error occured.</div>
        <div>Error code {error.code} [{error.message}].</div>
      </div>
    )
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
        isLoggedIn={accessStatus === LOGGED_IN}
        handleLogout={handleLogout}
      />
      {accessStatus === NOT_LOGGED_IN && <Login db={db} handleLoginSuccess={handleLoginSuccess} />}
      {accessStatus === LOGIN_ERROR && <div>Login Error</div>}
      {accessStatus === LOGGED_IN && <Protected token={token}/>}
    </>

  );
}

export default App;
