import React, { useState } from 'react';
import AuthService from '../../services/authService';
import Footer from '../footer/Footer';
import './Login.css'

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateInput = (input, type) => {
    const regex = /^[A-Za-z0-9_$#&]{0,12}$/; // Allow empty and up to 12 valid characters
    if (regex.test(input)) {
      if (type === 'username') {
        setUsername(input);
      } else if (type === 'password') {
        setPassword(input);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await AuthService.signIn(username, password);
      localStorage.setItem('userInfo', JSON.stringify(response));
      window.location.href = '/activeelements';
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      
      // Aquí podrías personalizar el mensaje de error basado en el tipo de error
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('Ha ocurrido un error inesperado durante el inicio de sesión');
      }
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
            placeholder="Introduce username"
            value={username}
            onChange={(e) => validateInput(e.target.value, 'username')}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Introduce password"
            value={password}
            onChange={(e) => validateInput(e.target.value, 'password')}
          />
        </div>
        <button className="button" onClick={handleLogin}>Login</button>
      </form>
      <Footer />
    </div>
  );
};

export default LoginForm;