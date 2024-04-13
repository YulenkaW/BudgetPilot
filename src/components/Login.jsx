import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = () => {
    // Validate username and password
    if (!username.trim() || !password.trim()) {
      alert('Username and password cannot be empty');
      return;
    }

    // If all validations pass, proceed with login
    onLogin();
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate name
    if (!name.trim()) {
      alert('Name cannot be empty');
      return;
    }


    // Validate username and password
    if (!username.trim() || !password.trim()) {
      alert('Username and password cannot be empty');
      return;
    }

    // If all validations pass, proceed with registration
    setIsNewUser(false);
  };

  return (
    <div className="login-container">
      <h2>{isNewUser ? 'Register' : 'Login'}</h2>
      {isNewUser && (
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
      )}
      {!isNewUser && (
        <>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleLogin}>Login</button>
        </>
      )}
      {!isNewUser ? (
        <p>
          Don't have an account?{' '}
          <span onClick={() => setIsNewUser(true)}>Register here</span>
        </p>
      ) : (
        <p>
          Already have an account?{' '}
          <span onClick={() => setIsNewUser(false)}>Login here</span>
        </p>
      )}
    </div>
  );
}

export default Login;
