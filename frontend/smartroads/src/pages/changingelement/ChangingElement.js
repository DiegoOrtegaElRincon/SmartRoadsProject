import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ChangingElementService from "../../services/ChangingElementService";
import AdminHeader from "../../components/header/AdminHeader";

const ChangingElement = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialChangingElementState = {
        UID: null,
        type: "",
        status: "",
        Location: {
            type: "Point",
            coordinates: [0, 0],
        },
    };

    const initialChangingElementState1 = {
        UID: null,
        type: "",
        status: "",
        location: {
            type: "Point",
            coordinates: [0, 0],
        },
    };

    const [changingElement, setChangingElement] = useState(initialChangingElementState1);
    const [currentChangingElement, setCurrentChangingElement] = useState(initialChangingElementState);
    const [message, setMessage] = useState("");

    const getChangingElement = id => {
        ChangingElementService.get(id)
            .then(response => {
                setCurrentChangingElement(response.data);
                setChangingElement({
                    type: response.data.Type,
                    status: response.data.Status,
                    location: {
                        coordinates: [response.data.Location.coordinates[0],response.data.Location.coordinates[1]]
                    }
                    // Set other fields based on the response and your ChangingElement model
                });
                console.log(response.data.Location)
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getChangingElement(id);
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        if (name === "latitude" || name === "longitude") {
            setChangingElement({
                ...changingElement,
                location: {
                    ...changingElement.location,
                    coordinates: name === "latitude" 
                        ? [parseFloat(value), changingElement.location.coordinates[1]] 
                        : [changingElement.location.coordinates[0], parseFloat(value)]
                }
            });
        } else {
            // Si no es una coordenada, actualiza normalmente
            setChangingElement({
                ...changingElement,
                [name]: value
            });
        }

        console.log(changingElement)
    };

    const updateChangingElement = () => {

        ChangingElementService.update(currentChangingElement.UID, changingElement)
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
                {changingElement ? (
                    <div className="edit-form">
                        <h4>ChangingElement</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Type">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Type"
                                    name="type"
                                    value={changingElement.type}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Status">Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Status"
                                    name="status"
                                    value={changingElement.status}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Latitude">Latitude</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="latitude"
                                    name="latitude"
                                    placeholder={changingElement.location.coordinates[0]}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Longitude">Longitude</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="longitude"
                                    name="longitude"
                                    placeholder={changingElement.location.coordinates[1]}
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
