import React from 'react';
import { useHistory } from 'react-router-dom'; // Importa el hook useHistory
import { PiArrowBendDownLeftThin } from 'react-icons/pi';

const Footer = () => {
    const history = useHistory();

    const handleGoHome = () => {
        history.push('/'); // Cambia la ruta según tu configuración de rutas
    };

    return (
        <footer className="navbar fixed-bottom navbar-light bg-light">
            <div className="container">
                <button
                    type="button"
                    className="btn btn-link"
                    onClick={handleGoHome}
                >
                    <PiArrowBendDownLeftThin size={30} />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
