import React, { useState, useEffect } from 'react';

const Login = ({  db,
                  handleLoginSuccess
              }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  
  // Login status
  const NOT_LOGGED_IN = "notLoggedIn";
  const LOGGED_IN = "loggedIn";
  const LOGIN_ERROR = "loginError";
  const [loginStatus, setLoginStatus] = useState(NOT_LOGGED_IN);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(`Logging in with ${username}, ${password}`);
      const token = await db.login(username, password);
      console.log("Received token", token);
      setToken(token);
      setLoginStatus(LOGGED_IN);
      handleLoginSuccess(token);
    } catch (error) {
      console.log("Error logging in:", error);
      setUsername("");
      setPassword("");
      setToken(null);
      setLoginStatus(NOT_LOGGED_IN);
    }
  };

  useEffect(() => {
    console.log("loginStatus|token updated to:", loginStatus, "|", token);
  }, [loginStatus, token]);
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
