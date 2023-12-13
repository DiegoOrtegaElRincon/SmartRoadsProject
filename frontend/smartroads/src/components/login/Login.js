import React, { useState } from 'react';
import AuthService from '../../services/authService';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await AuthService.signIn(username, password);

      localStorage.setItem('userInfo', JSON.stringify(response));

      window.location.href = '/activeelements';
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="submit-form">
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1 className="mb-4">Inicio de Sesión</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
