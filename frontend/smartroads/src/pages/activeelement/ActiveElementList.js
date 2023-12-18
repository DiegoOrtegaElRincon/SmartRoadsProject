import React, { useState, useEffect } from 'react';
import ActiveElementService from '../../services/ActiveElementService';
import AdminHeader from '../../components/header/AdminHeader';
import './ActiveElementList.css';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";


const ActiveElementsList = () => {
    const [activeElements, setActiveElements] = useState([]);
    const [currentActiveElement, setCurrentActiveElement] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchUsername, setSearchUsername] = useState("");

    useEffect(() => {
        retrieveActiveElements();
    }, []);

    const onChangeSearchUsername = e => {
        const searchUsername = e.target.value;
        setSearchUsername(searchUsername);
    };

    const retrieveActiveElements = () => {
        ActiveElementService.getAll()
            .then(response => {
                setActiveElements(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveActiveElements();
        setCurrentActiveElement(null);
        setCurrentIndex(-1);
    };

    const setActiveActiveElement = (activeelements, index) => {
        setCurrentActiveElement(activeelements);
        setCurrentIndex(index);
    };

    const removeAllActiveElements = () => {
        ActiveElementService.removeAll()
            .then(response => {
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByUsername = () => {
        ActiveElementService.findByUsername(searchUsername)
            .then(response => {
                setActiveElements(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="active-elements-container">
            <AdminHeader />
            <div className="active-elements-content">
                <h2 className="active-elements-title">Active Elements</h2>

                <ul className="active-elements-list">
                    {activeElements &&
                        activeElements.map((activeelement, index) => (
                            <li
                                className={"active-element-item " + (index === currentIndex ? "active" : "")}
                                onClick={() => setActiveActiveElement(activeelement, index)}
                                key={index}
                            >
                                {activeelement.UID}
                            </li>
                        ))
                    }
                </ul>
                <Link to={"/add-activeelements"}><CiSquarePlus size={50} color='white' /></Link>
                {currentActiveElement ? (
                    <div className="active-element-details">
                        <h4>Active Element</h4>
                        {/* ... */}
                        <Link
                            to={"/activeelements/" + currentActiveElement.UID}
                            className="active-element-edit-link"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div className="active-element-details-placeholder">
                        <p>Please click on an Active Element...</p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};


export default ActiveElementsList;
