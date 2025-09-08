import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardNew from "./pages/newpages/Dashboard/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dashboardnew/*" element={<DashboardNew />} />
      {/* <Route path="/dashboardnew/*" element={<DashboardNew />} /> */}

    </Routes>
  );
};

export default AppRoutes;

