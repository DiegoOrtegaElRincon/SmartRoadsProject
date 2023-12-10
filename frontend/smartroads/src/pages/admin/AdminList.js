import React, { useState, useEffect } from "react";
import AdminService from "../../services/AdminService"; // Update with the actual service
import { Link } from "react-router-dom";


const AdminsList = () => {
    const [admins, setAdmins] = useState([]);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchUsername, setSearchUsername] = useState("");

    const img = `http://localhost:3000/images/${currentAdmin.filename}`

    useEffect(() => {
        retrieveAdmins();
    }, []);

    const onChangeSearchUsername = e => {
        const searchUsername = e.target.value;
        setSearchUsername(searchUsername);
    };

    const retrieveAdmins = () => {
        AdminService.getAll()
            .then(response => {
                setAdmins(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveAdmins();
        setCurrentAdmin(null);
        setCurrentIndex(-1);
    };

    const setActiveAdmin = (admin, index) => {
        setCurrentAdmin(admin);
        setCurrentIndex(index);
    };

    const removeAllAdmins = () => {
        AdminService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByUsername = () => {
        AdminService.findByUsername(searchUsername)
            .then(response => {
                setAdmins(response.data);
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
                        placeholder="Search by username"
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
                <h4>Admins List</h4>

                <ul className="list-group">
                    {admins &&
                        admins.map((admin, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveAdmin(admin, index)}
                                key={index}
                            >
                                {admin.Username}
                            </li>
                        ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllAdmins}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentAdmin ? (
                    <div>
                        <h4>Admin</h4>
                        <div>
                            <label>
                                <strong>Username:</strong>
                            </label>{" "}
                            {currentAdmin.Username}
                        </div>
                        <div>
                            <label>
                                <strong>Password:</strong>
                            </label>{" "}
                            {currentAdmin.Password}
                        </div>
                        <div>
                            <label>
                                <strong>Image:</strong>
                            </label>
                            <br />
                            <img src={img} alt="Admin Image" />
                        </div>

                        <Link
                            to={"/admins/" + currentAdmin.Id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an Admin...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminsList;
