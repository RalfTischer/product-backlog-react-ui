import React, { useState } from 'react';

function Login({ onLogin, db }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log(`Logging in with ${username}, ${password}`);
      const token = await db.login(username, password);
      console.log("Received token", token);

      if (token) {
        console.log("Success in receiving the token", token);
        onLogin(token); // Call the onLogin callback with the token
        return <p>Logged in with token {token}</p>
      } else {
        // Render error
        return <p>Error logging in.</p>;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Render error message or handle the error in another way
      return <p>Error logging in.</p>;
    }
  };

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
