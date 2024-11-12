// Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'; 
import Login from './pages/Login'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signin" element={<Login />} />

    </Routes>
  );
};

export default AppRoutes;
