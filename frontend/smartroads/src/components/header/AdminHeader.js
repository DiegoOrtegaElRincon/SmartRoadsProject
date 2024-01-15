import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHeader.css'; // Make sure to link the new CSS file

const AdminHeader = () => {
    return (
        <div className="custom-nav-container">
            <div className="custom-nav">
                <div className="nav-items">
                    <Link to={"/admins"} className="nav-item-link">
                        Admins
                    </Link>
                    <Link to={"/activeelements"} className="nav-item-link">
                        ActiveE
                    </Link>
                    <Link to={"/changingelements"} className="nav-item-link">
                        ChangingE
                    </Link>
                    <Link to={"/passiveelements"} className="nav-item-link">
                        PassiveE
                    </Link>
                    <Link to={"http://localhost:5488/templates/fNdZsQC"} className="nav-item-link">Reports</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
