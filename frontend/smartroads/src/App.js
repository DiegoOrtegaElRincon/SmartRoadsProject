import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminsList from "./pages/admin/AdminList";
import AddAdmin from "./pages/admin/AddAdmin";
import Admin from "./pages/admin/Admin";
import ActiveElementsList from "./pages/activeelement/ActiveElementList";
import ActiveElement from "./pages/activeelement/ActiveElement";
import AddActiveElement from "./pages/activeelement/AddActiveElement";

function App() {
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
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<AdminsList />} />
          <Route path="/admins" element={<AdminsList />} />
          <Route path="/add-admins" element={<AddAdmin />} />
          <Route path="/admins/:id" element={<Admin />} />
          <Route path="/activeelements" element={<ActiveElementsList />} />
          <Route path="/add-activeelements" element={<AddActiveElement />} />
          <Route path="/activeelements/:id" element={<ActiveElement />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
