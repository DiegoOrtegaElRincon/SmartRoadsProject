import React, { useState } from "react";
import ActiveElementDataService from "../../services/ActiveElementService";
import AdminHeader from "../../components/header/AdminHeader";

const AddActiveElement = () => {
  const initialActiveElementState = {
    Type: "",
    Status: "",
    Speed: "",
  };

  const [activeElement, setActiveElement] = useState(initialActiveElementState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActiveElement({ ...activeElement, [name]: value });
  };

  const saveActiveElement = () => {
    const formData = new FormData();
    formData.append("type", activeElement.Type);
    formData.append("status", activeElement.Status);
    formData.append("speed", activeElement.Speed);
    console.log(formData)
    ActiveElementDataService.create(formData)
      .then((response) => {
        setActiveElement({
          Type: response.data.Type,
          Status: response.data.Status,
          Speed: response.data.Speed,
        });
        setSubmitted(true);
        setError(null); // Limpiar cualquier mensaje de error existente
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        setError(error.response.data.message);
      });
  };

  const newActiveElement = () => {
    setActiveElement(initialActiveElementState);
    setSubmitted(false);
    setError(null); // Limpiar cualquier mensaje de error existente al iniciar un nuevo registro
  };

  return (
    <div>
      <AdminHeader />
      <div className="submit-form">
        {error && <div className="alert alert-danger">{error}</div>}
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={newActiveElement}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="Type">Type</label>
              <input
                type="text"
                className="form-control"
                id="Type"
                required
                value={activeElement.Type}
                onChange={handleInputChange}
                name="Type"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Status">Status</label>
              <input
                type="text"
                className="form-control"
                id="Status"
                required
                value={activeElement.Status}
                onChange={handleInputChange}
                name="Status"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Speed">Speed</label>
              <input
                type="Speed"
                className="form-control"
                id="Speed"
                required
                onChange={handleInputChange}
                name="Speed"
                multiple
              />
            </div>

            <button onClick={saveActiveElement} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddActiveElement;
