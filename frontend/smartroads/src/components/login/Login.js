import React, { useState } from 'react';
import AuthService from '../../services/authService';
import Footer from '../footer/Footer';
import './Login.css'

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
      <h1 className="mb-4">Inicio de Sesión</h1>
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Introduce email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Introduce password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="button button1"
          onClick={handleLogin}
        >Login</button>
      </form>
      <Footer />
    </div>
  );
};

export default LoginForm;