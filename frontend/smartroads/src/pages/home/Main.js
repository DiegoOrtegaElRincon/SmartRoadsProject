import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import './Main.css'; // Import your CSS file

const Main = () => {
  return (
    <div className="main-container">
      <Header title={'Tracker'} />
      <div className="content-container">
        <div className="link-container">
          <Link to="/bicycle" className="image-link">
            <img
              src="bicycle.png" // Update with your image
              alt="Enlace a Bicicleta"
              className="responsive-image"
            />
          </Link>
        </div>

        <div className="link-container">
          <Link to="/car" className="image-link">
            <img
              src="car.png" // Update with your image
              alt="Enlace a Coche"
              className="responsive-image"
            />
          </Link>
        </div>
      </div>

      <div className="login-prompt">
        <p>
          ¿Eres administrador?{' '}
          <Link to="/login" className="login-link">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Main;
