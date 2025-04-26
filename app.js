import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AppointmentForm from './components/AppointmentForm';
import Reports from './components/Reports';
import Watchlist from './components/Watchlist';
import QRPayment from './components/QRPayment';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
    <Route path="/appointment" element={
      <ProtectedRoute>
        <AppointmentForm />
      </ProtectedRoute>
    } />
    <Route path="/reports" element={
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    } />
    <Route path="/watchlist" element={
      <ProtectedRoute>
        <Watchlist />
      </ProtectedRoute>
    } />
    <Route path="/qrpayment" element={
      <ProtectedRoute>
        <QRPayment />
      </ProtectedRoute>
    } />
  </Routes>
);

export default App;
