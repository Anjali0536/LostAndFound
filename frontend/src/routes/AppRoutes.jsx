import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import FoundItems from '../pages/FoundItems';
import FoundPostDetail from '../pages/FoundPostDetail';
import ReportFoundItem from '../pages/ReportFoundItem';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Phase 3 — Found Posts */}
      <Route path="/found-items" element={<FoundItems />} />
      <Route path="/found-posts/:id" element={<FoundPostDetail />} />
      <Route path="/report-found" element={<ReportFoundItem />} />
    </Routes>
  );
};

export default AppRoutes;
