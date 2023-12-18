import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import { PiArrowUUpLeftThin } from "react-icons/pi";
import './Bicycle.css'; // Import the CSS file
import Footer from '../../components/footer/Footer';

const Bicycle = () => {
    const bicycleData = {
        image: 'bicycle.png', // Replace with your image URL
        speed: '25 km/h',
    };

    return (
        <div className="bicycle-container">
            <Header title={'Bicicletas'} />
            <div className="bicycle-content">
                <div className="bicycle-image-container">
                    <img src={bicycleData.image} alt="Bicicleta" className="bicycle-image" />
                </div>

                <div className="bicycle-speed">
                    <h1>Velocidad:</h1>
                    <h2>{bicycleData.speed}</h2>
                </div>

                <div className="back-link">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Bicycle;
