import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminsList from "./components/AdminList";
import AddAdmin from "./components/AddAdmin";
import Admin from "./components/Admin";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/admins" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/admins"} className="nav-link">
              Admins
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<AdminsList />} />
          <Route path="/admins" element={<AdminsList />} />
          <Route path="/add" element={<AddAdmin />} />
          <Route path="/admins/:id" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
