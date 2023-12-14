import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ChangingElementService from "../../services/ChangingElementService"; // Update with the actual service
import AdminHeader from "../../components/header/AdminHeader";

const ChangingElement = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialChangingElementState = {
        UID: null,
        Type: "",
        Status: "",
        Location: {
            type: "Point",
            coordinates: [0, 0], // Initial coordinates; you may adjust this based on your needs
        },
        // Add other fields based on your ChangingElement model
    };

    const [currentChangingElement, setCurrentChangingElement] = useState(initialChangingElementState);
    const [message, setMessage] = useState("");

    const getChangingElement = id => {
        ChangingElementService.get(id)
            .then(response => {
                setCurrentChangingElement(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getChangingElement(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentChangingElement({ ...currentChangingElement, [name]: value });
    };

    const updateChangingElement = () => {
        ChangingElementService.update(currentChangingElement.UID, currentChangingElement)
            .then(response => {
                console.log(response);
                setMessage("The changingElement was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteChangingElement = () => {
        ChangingElementService.remove(currentChangingElement.UID)
            .then(response => {
                console.log(response.data);
                navigate("/changingelements");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <AdminHeader />
            <div>
                {currentChangingElement ? (
                    <div className="edit-form">
                        <h4>ChangingElement</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Type">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Type"
                                    name="Type"
                                    value={currentChangingElement.Type}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Status">Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Status"
                                    name="Status"
                                    value={currentChangingElement.Status}
                                    onChange={handleInputChange}
                                />
                            </div>
                             <div className="form-group">
                                <label htmlFor="Latitude">Latitude</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Latitude"
                                    name="Location.latitude"
                                    value={currentChangingElement.Location.coordinates[1]}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Longitude">Longitude</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Longitude"
                                    name="Location.longitude"
                                    value={currentChangingElement.Location.coordinates[0]}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>

                        <button className="badge badge-danger mr-2" type="button" onClick={deleteChangingElement}>
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={updateChangingElement}
                        >
                            Update
                        </button>
                        <p>{message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a ChangingElement...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChangingElement;
