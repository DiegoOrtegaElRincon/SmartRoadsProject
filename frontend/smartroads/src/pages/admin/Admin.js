import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import AdminService from "../../services/AdminService"; // Update with the actual service

const Admin = () => {
    const { id } = useParams();
    let navigate = useNavigate();

    const initialAdminState = {
        Id: null,
        Username: "",
        Password: "",
        filename: "",
    };
    const [currentAdmin, setCurrentAdmin] = useState(initialAdminState);
    const [message, setMessage] = useState("");

    const getAdmin = id => {
        AdminService.get(id)
            .then(response => {
                setCurrentAdmin(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getAdmin(id);
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentAdmin({ ...currentAdmin, [name]: value });
    };

    const updateAdmin = () => {
        AdminService.update(currentAdmin.Id, currentAdmin)
            .then(response => {
                console.log(response.data);
                setMessage("The admin was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteAdmin = () => {
        AdminService.remove(currentAdmin.Id)
            .then(response => {
                console.log(response.data);
                navigate("/admins");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentAdmin ? (
                <div className="edit-form">
                    <h4>Admin</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="Username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Username"
                                name="Username"
                                value={currentAdmin.Username}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Password"
                                name="Password"
                                value={currentAdmin.Password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <button className="badge badge-danger mr-2" type="button" onClick={deleteAdmin}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateAdmin}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on an Admin...</p>
                </div>
            )}
        </div>
    );
};

export default Admin;
