import React, { useState } from 'react';

function Login({ onLogin, db }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = db.login(username, password);

    if (token) {
      console.log("Success in receiving the token", token);
      onLogin(token); // Call the onLogin callback with the token
    } else {
        // Render error
        return <p>Error logging in.</p>
    };
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
