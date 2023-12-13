import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AdminsList from "./pages/admin/AdminList";
import AddAdmin from "./pages/admin/AddAdmin";
import Admin from "./pages/admin/Admin";
import ActiveElementsList from "./pages/activeelement/ActiveElementList";
import ActiveElement from "./pages/activeelement/ActiveElement";
import AddActiveElement from "./pages/activeelement/AddActiveElement";
import Main from "./pages/home/Main";
import Login from "./pages/login/Login";
import Bicycle from "./pages/bicycles/Bicycles";
import Car from "./pages/cars/Car";

function App() {
  return (
    <div className="app">
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/bicycle" element={<Bicycle />} />
          <Route path="/car" element={<Car />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admins" element={<AdminsList />} />
          <Route path="/add-admins" element={<AddAdmin />} />
          <Route path="/admins/:id" element={<Admin />} />
          <Route path="/activeelements" element={<ActiveElementsList />} />
          <Route path="/add-activeelements" element={<AddActiveElement />} />
          <Route path="/activeelements/:id" element={<ActiveElement />} />
        </Routes>
      {/* </BrowserRouter> */}
    </div>

  );
}

export default App;
