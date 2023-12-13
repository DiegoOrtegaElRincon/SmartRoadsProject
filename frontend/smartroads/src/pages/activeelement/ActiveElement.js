import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ActiveElementService from "../../services/ActiveElementService"; // Update with the actual service
import AdminHeader from "../../components/header/AdminHeader";

const ActiveElement = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialActiveElementState = {
        UID: null,
        type: "",
        status: "",
        speed: "",
    };

    const [currentActiveElement, setCurrentActiveElement] = useState(initialActiveElementState);
    const [message, setMessage] = useState("");

    const getActiveElement = id => {
        ActiveElementService.get(id)
            .then(response => {
                setCurrentActiveElement(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getActiveElement(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentActiveElement({ ...currentActiveElement, [name]: value });
    };

    const updateActiveElement = () => {
        ActiveElementService.update(currentActiveElement.UID, currentActiveElement)
            .then(response => {
                console.log(response)
                setMessage("The activeElement was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteActiveElement = () => {
        ActiveElementService.remove(currentActiveElement.UID)
            .then(response => {
                console.log(response.data);
                navigate("/activeelements");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <AdminHeader />
            <div>
                {currentActiveElement ? (
                    <div className="edit-form">
                        <h4>ActiveElement</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="type">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="type"
                                    name="type"
                                    value={currentActiveElement.type}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="status"
                                    name="status"
                                    value={currentActiveElement.status}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="speed">Speed</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="speed"
                                    name="speed"
                                    value={currentActiveElement.speed}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>

                        <button className="badge badge-danger mr-2" type="button" onClick={deleteActiveElement}>
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={updateActiveElement}
                        >
                            Update
                        </button>
                        <p>{message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an ActiveElement...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveElement;
