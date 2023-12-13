import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header/Header';

const Main = () => {
    return (
        <div>
            <Header title={'Tracker'} />
            <div className="container mt-5">

                <div className="row mt-4">
                    <div className="col-md-6 mb-4">
                        <Link to="/bicycle">
                            <img
                                src="logo192.png"
                                alt="Enlace a Bicicleta"
                                className="img-fluid"
                            />
                        </Link>
                    </div>

                    <div className="col-md-6 mb-4">
                        <Link to="/car">
                            <img
                                src="logo192.png"
                                alt="Enlace a Coche"
                                className="img-fluid"
                            />
                        </Link>
                    </div>
                </div>

                <div className="text-center">
                    <p>
                        ¿Eres administrador?{' '}
                        <Link to="/login" className="text-muted">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
