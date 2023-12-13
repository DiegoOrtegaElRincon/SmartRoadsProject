import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/admins" className="navbar-brand">
                    Admin View
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/admins"} className="nav-link">
                            Admins
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/activeelements"} className="nav-link">
                            Active Element
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/changingelements"} className="nav-link">
                            Changing Element
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/passiveelements"} className="nav-link">
                            Passive Element
                        </Link>
                    </li>
                </div>
            </nav>
        </div>
    );
};

export default AdminHeader;
