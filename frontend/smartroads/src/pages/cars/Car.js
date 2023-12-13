import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import { PiArrowUUpLeftThin } from "react-icons/pi";

const Car = () => {
    // Puedes ajustar estos valores según tus necesidades
    const carData = {
        image: 'URL_IMAGEN_COCHE',
        speed: '150 km/h', // Velocidad del coche
    };

    return (
        <div>
            <Header title={'Coches'} />
            <div className="container mt-5">
                <h1>Coche</h1>

                <div className="mb-4">
                    <img src={carData.image} alt="Coche" className="img-fluid" />
                </div>

                <div className="mb-4">
                    <h2>Velocidad:</h2>
                    <p>{carData.speed}</p>
                </div>

                <div className="text-center">
                    <Link to="/" className="text-muted">
                        <PiArrowUUpLeftThin size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Car;
