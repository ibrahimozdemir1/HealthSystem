import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import DoctorPrescriptionForm from './components/DoctorPrescriptionForm';
import DoctorPrescriptionList from './components/DoctorPrescriptionList';
import PharmacyPrescriptionForm from './components/PharmacyPrescriptionForm';
import LoginPage from './components/LoginPage';
import { isAuthenticated, logout } from './components/Auth';


import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <AuthHandler />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/pharmacy" element={<PrivateRoute component={PharmacyPage} />} />
                    <Route path="/" element={<PrivateRoute component={DoctorPage} />} />
                </Routes>
            </div>
        </Router>
    );
}

function PrivateRoute({ component: Component }) {
    return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
}

function AuthHandler() {
    const location = useLocation();

    if (!isAuthenticated() || location.pathname === "/login") return null;

    return (
        <div className="logout-container">
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
    );
}

function DoctorPage() {
    return (
        <>
            <PharmacyButton />
            <DoctorPrescriptionForm />
            <DoctorPrescriptionList />
        </>
    );
}

function PharmacyPage() {
    return (
        <>
            <DoctorButton />
            <PharmacyPrescriptionForm />
        </>
    );
}

function PharmacyButton() {
    const location = useLocation();
    return location.pathname !== "/pharmacy" && (
        <div className="pharmacy-button-container">
            <a href="/pharmacy">
                <button className="pharmacy-button">Pharmacy Form</button>
            </a>
        </div>
    );
}

function DoctorButton() {
    return (
        <div className="doctor-button-container">
            <a href="/">
                <button className="doctor-button">Doctor Form</button>
            </a>
        </div>
    );
}

export default App;
