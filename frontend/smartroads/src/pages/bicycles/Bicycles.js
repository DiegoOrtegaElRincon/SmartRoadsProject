import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import { PiArrowUUpLeftThin } from "react-icons/pi";

const Bicycle = () => {
    // Puedes ajustar estos valores según tus necesidades
    const bicycleData = {
        image: 'URL_IMAGEN_BICICLETA',
        speed: '25 km/h', // Velocidad de la bicicleta
    };

    return (
        <div>
            <Header title={'Bicicletas'} />
            <div className="container mt-5">
                <h1>Bicicleta</h1>

                <div className="mb-4">
                    <img src={bicycleData.image} alt="Bicicleta" className="img-fluid" />
                </div>

                <div className="mb-4">
                    <h2>Velocidad:</h2>
                    <p>{bicycleData.speed}</p>
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

export default Bicycle;
