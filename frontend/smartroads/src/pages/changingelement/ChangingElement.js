import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChangingElementService from "../../services/ChangingElementService";
import AdminHeader from "../../components/header/AdminHeader";

const ChangingElement = () => {
  const { id } = useParams();

  const initialChangingElementState = {
    type: "",
    status: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
  };

  const [changingElement, setChangingElement] = useState(
    initialChangingElementState
  );
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChangingElement = async () => {
      try {
        const response = await ChangingElementService.get(id);
        setChangingElement(response.data);
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data.message);
      }
    };

    getChangingElement();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "latitude" || name === "longitude") {
      setChangingElement({
        ...changingElement,
        location: {
          ...changingElement.location,
          coordinates: name === "latitude" ? [parseFloat(value), changingElement.location.coordinates[1]] : [changingElement.location.coordinates[0], parseFloat(value)],
        },
      });
    } else {
      setChangingElement({
        ...changingElement,
        [name]: value,
      });
    }
  };

  const updateChangingElement = () => {
    ChangingElementService.update(id, changingElement)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
        setError(null);
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
            <h4>You submitted the update successfully!</h4>
            <button className="btn btn-success" onClick={newChangingElement}>
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <form>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  value={changingElement.type}
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
                  value={changingElement.status}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="latitude"
                  name="latitude"
                  value={changingElement.location.coordinates[0]}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="longitude"
                  name="longitude"
                  value={changingElement.location.coordinates[1]}
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <button onClick={updateChangingElement} className="btn btn-success">
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangingElement;
