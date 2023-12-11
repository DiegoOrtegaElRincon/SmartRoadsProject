import React, { useState, useEffect } from "react";
import ActiveElementService from "../../services/ActiveElementService"; // Update with the actual service
import { Link } from "react-router-dom";


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
                console.log(response.data);
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
                console.log(response.data);
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
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by UID"
                        value={searchUsername}
                        onChange={onChangeSearchUsername}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByUsername}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>ActiveElements List</h4>

                <ul className="list-group">
                    {activeElements &&
                        activeElements.map((activeelements, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveActiveElement(activeelements, index)}
                                key={index}
                            >
                                {activeelements.UID}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllActiveElements}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentActiveElement ? (
                    <div>
                        <h4>Active Element</h4>
                        <div>
                            <label>
                                <strong>Type:</strong>
                            </label>{" "}
                            {currentActiveElement.Type}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentActiveElement.Status}
                        </div>
                        <div>
                            <label>
                                <strong>Speed:</strong>
                            </label>{" "}
                            {currentActiveElement.Speed}
                        </div>

                        <Link
                            to={"/activeelements/" + currentActiveElement.Id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an Active Element...</p>
                    </div>
                )}
            </div>
            <button className="btn btn-success">
                <Link to={"/add-activeelements"} className="link">
                    Add
                </Link>
            </button>
        </div>
    );
};

export default ActiveElementsList;
