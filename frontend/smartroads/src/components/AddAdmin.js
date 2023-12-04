import React, { useState } from "react";
import AdminDataService from "../services/AdminService";

const AddAdmin = () => {
  const initialAdminState = {
    Username: "",
    Password: "",
    filename: null,
  };

  const [admin, setAdmin] = useState(initialAdminState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAdmin({ ...admin, filename: file });
  };

  const saveAdmin = () => {
    const formData = new FormData();
    formData.append("username", admin.Username);
    formData.append("password", admin.Password);
    formData.append("filename", admin.filename);

    AdminDataService.create(formData)
      .then((response) => {
        setAdmin({
          Username: response.data.Username,
          Password: response.data.Password,
          filename: response.data.filename,
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

  const newAdmin = () => {
    setAdmin(initialAdminState);
    setSubmitted(false);
    setError(null); // Limpiar cualquier mensaje de error existente al iniciar un nuevo registro
  };

  return (
    <div className="submit-form">
      {error && <div className="alert alert-danger">{error}</div>}
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newAdmin}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              className="form-control"
              id="Username"
              required
              value={admin.Username}
              onChange={handleInputChange}
              name="Username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="text"
              className="form-control"
              id="Password"
              required
              value={admin.Password}
              onChange={handleInputChange}
              name="Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="filename">Filename</label>
            <input
              type="file"
              className="form-control"
              id="filename"
              required
              onChange={handleFileChange}
              name="filename"
            />
          </div>

          <button onClick={saveAdmin} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAdmin;
