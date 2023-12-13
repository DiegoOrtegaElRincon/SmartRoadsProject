import React, { useState } from "react";
import ChangingElementService from "../../services/ChangingElementService"; // Update with the actual service
import AdminHeader from "../../components/header/AdminHeader";

const AddChangingElement = () => {

    const initialChangingElementState = {
        Type: "",
        Status: "",
        Location: {
            type: "Point",
            coordinates: [0, 0], // Initial coordinates; you may adjust this based on your needs
        }
        // Add other fields based on your ChangingElement model
    };

    const [changingElement, setChangingElement] = useState(initialChangingElementState);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChangingElement({ ...changingElement, [name]: value });
    };

    const saveChangingElement = () => {
        ChangingElementService.create(changingElement)
            .then((response) => {
                setChangingElement({
                    Type: response.data.Type,
                    Status: response.data.Status,
                    Location: response.data.Location
                    // Set other fields based on the response and your ChangingElement model
                });
                setSubmitted(true);
                setError(null);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
                setError(error.response.data.message);
            });
    };

    const newChangingElement = () => {
        setChangingElement(initialChangingElementState);
        setSubmitted(false);
        setError(null);
    };

    return (
        <div>
            <AdminHeader />
            <div className="submit-form">
                {error && <div className="alert alert-danger">{error}</div>}
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={newChangingElement}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <form>
                            <div className="form-group">
                                <label htmlFor="Type">Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Type"
                                    name="Type"
                                    value={"Eg: Car"}
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
                                    value={"Eg: 1"}
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
                                    value={"Eg: -34.984398273"}
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
                                    value={"Eg: 72.684657852"}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </form>
                        <button onClick={saveChangingElement} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddChangingElement;
