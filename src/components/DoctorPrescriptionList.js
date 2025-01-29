import React, { useState } from "react";
import { getPrescriptionsByPatientTC } from "../services/api";
import "../formcss/DoctorPrescriptionForm.css";

const DoctorPrescriptionList = () => {
    const [patientTC, setPatientTC] = useState("");
    const [prescriptions, setPrescriptions] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await getPrescriptionsByPatientTC(patientTC);
            setPrescriptions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="doctor-form-container">
            <label className="doctor-form-label">Patient TC</label>
            <input
                type="text"
                placeholder="Enter Patient TC"
                value={patientTC}
                onChange={(e) => setPatientTC(e.target.value)}
                className="doctor-form-input"
            />
            <button onClick={handleSearch} className="doctor-search-button">
                Search
            </button>
            <ul className="doctor-prescription-list">
                {prescriptions.map((prescription) => (
                    <li key={prescription.id} className="doctor-prescription-item">
                        {prescription.fullName} - {prescription.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorPrescriptionList;
