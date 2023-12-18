import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';
import { PiArrowUUpLeftThin } from "react-icons/pi";
import './Car.css'; // Import the CSS file
import Footer from '../../components/footer/Footer';

const Car = () => {
    const carData = {
        image: 'car.png', // Replace with your image URL
        speed: '150 km/h',
    };

    return (
        <div className="car-container">
            <Header title={'Coches'} />
            <div className="car-content">
                <div className="car-image-container">
                    <img src={carData.image} alt="Coche" className="car-image" />
                </div>

                <div className="car-speed">
                    <h1>Velocidad:</h1>
                    <h2>{carData.speed}</h2>
                </div>

                <div className="back-link">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Car;
