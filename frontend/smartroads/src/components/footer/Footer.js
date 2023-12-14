import React from 'react';
import { PiArrowBendDownLeftThin } from 'react-icons/pi';
import './Footer.css'; // Make sure to import the CSS file

const Footer = () => {
    const handleGoHome = () => {
        window.location.href = '/';
    };

    return (
        <footer className="custom-footer">
            <div className="footer-container">
                <button
                    type="button"
                    className="home-button"
                    onClick={handleGoHome}
                >
                    <PiArrowBendDownLeftThin size={30} />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
