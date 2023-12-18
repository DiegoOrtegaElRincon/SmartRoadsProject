import React, { useState, useEffect } from "react";
import ChangingElementService from "../../services/ChangingElementService"; // Update with the actual service
import { Link } from "react-router-dom";
import AdminHeader from "../../components/header/AdminHeader";

const ChangingElementList = () => {
  const [changingElements, setChangingElements] = useState([]);
  const [currentChangingElement, setCurrentChangingElement] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchUID, setSearchUID] = useState("");

  useEffect(() => {
    retrieveChangingElements();
  }, []);

  const onChangeSearchUID = (e) => {
    const searchUID = e.target.value;
    setSearchUID(searchUID);
  };

  const retrieveChangingElements = () => {
    ChangingElementService.getAll()
      .then((response) => {
        setChangingElements(response.data);
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveChangingElements();
    setCurrentChangingElement(null);
    setCurrentIndex(-1);
  };

  const setActiveChangingElement = (changingElement, index) => {
    setCurrentChangingElement(changingElement);
    setCurrentIndex(index);
  };

  const removeAllChangingElements = () => {
    ChangingElementService.removeAll()
      .then((response) => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByUID = () => {
    ChangingElementService.findByUID(searchUID)
      .then((response) => {
        setChangingElements(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <AdminHeader />
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by UID"
              value={searchUID}
              onChange={onChangeSearchUID}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByUID}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>ChangingElements List</h4>

          <ul className="list-group">
            {changingElements &&
              changingElements.map((changingElement, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() =>
                    setActiveChangingElement(changingElement, index)
                  }
                  key={index}
                >
                  {changingElement.UID}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllChangingElements}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentChangingElement ? (
            <div>
              <h4>Changing Element</h4>
              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {currentChangingElement.Type}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentChangingElement.Status}
              </div>
              <div>
                <label>
                  <strong>Location:</strong>
                </label>{" "}
                <div>
                  {'  Logitude: '}{currentChangingElement.Location.coordinates[0]}
                </div>
                <div>
                  {'  Latitude: '}{currentChangingElement.Location.coordinates[1]}
                </div>
              </div>

              <Link
                to={"/changingelements/" + currentChangingElement.UID}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Changing Element...</p>
            </div>
          )}
        </div>
        <button className="btn btn-success">
          <Link to={"/add-changingelements"} className="link">
            Add
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ChangingElementList;
