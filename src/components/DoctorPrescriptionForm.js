import React, { useState } from "react";
import { createPrescription, updatePrescription } from "../services/api";
import "../formcss/DoctorPrescriptionForm.css";

const DoctorPrescriptionForm = () => {
    const [formData, setFormData] = useState({
        id: "",
        doctorId: "",
        patientTC: "",
        fullName: "",
        status: "",
        medicineDTOList: [],
    });

    const [medicine, setMedicine] = useState({
        name: "",
        dosage: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMedicineChange = (e) => {
        const { name, value } = e.target;
        setMedicine({ ...medicine, [name]: value });
    };

    const addMedicine = () => {
        if (medicine.name && medicine.dosage) {
            setFormData({
                ...formData,
                medicineDTOList: [...formData.medicineDTOList, medicine],
            });
            setMedicine({ name: "", dosage: "" });
        } else {
            alert("Please fill in both medicine name and dosage.");
        }
    };

    const deleteMedicine = (index) => {
        const updatedMedicineList = formData.medicineDTOList.filter(
            (med, medIndex) => medIndex !== index
        );
        setFormData({ ...formData, medicineDTOList: updatedMedicineList });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createPrescription(formData);
            alert(`Prescription created with ID: ${response.data}`);
        } catch (error) {
            console.error(error);
            alert("A prescription with this ID already exists.");
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePrescription(formData);
            alert(`Prescription updated with ID: ${response.data}`);
        } catch (error) {
            console.error(error);
            alert("A prescription with this ID already exists.");
        }
    };

    return (
        <div className="doctor-form-container">
            <h2 className="doctor-form-title">Doctor Prescription Form</h2>
            <form className="doctor-form">
                {/* Prescription ID */}
                <div className="doctor-form-group">
                    <label className="doctor-form-label">Prescription ID</label>
                    <input
                        type="text"
                        name="id"
                        placeholder="Enter Prescription ID"
                        value={formData.id}
                        onChange={handleChange}
                        className="doctor-form-input"
                    />
                </div>

                {/* Doctor ID */}
                <div className="doctor-form-group">
                    <label className="doctor-form-label">Doctor ID</label>
                    <input
                        type="text"
                        name="doctorId"
                        placeholder="Enter Doctor ID"
                        value={formData.doctorId}
                        onChange={handleChange}
                        required
                        className="doctor-form-input"
                    />
                </div>

                {/* Patient TC */}
                <div className="doctor-form-group">
                    <label className="doctor-form-label">Patient TC</label>
                    <input
                        type="text"
                        name="patientTC"
                        placeholder="Enter Patient TC"
                        value={formData.patientTC}
                        onChange={handleChange}
                        required
                        className="doctor-form-input"
                    />
                </div>

                {/* Full Name */}
                <div className="doctor-form-group">
                    <label className="doctor-form-label">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="doctor-form-input"
                    />
                </div>

                {/* Status */}
                <div className="doctor-form-group">
                    <label className="doctor-form-label">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="doctor-form-input"
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                {/* Medicine Input */}
                <div className="doctor-form-group">
                    <h3 className="doctor-medicine-title">Medicine Add</h3>
                    <div className="medicine-input">
                        <input
                            type="text"
                            name="name"
                            placeholder="Medicine Name"
                            value={medicine.name}
                            onChange={handleMedicineChange}
                            className="doctor-form-input"
                        />
                        <input
                            type="text"
                            name="dosage"
                            placeholder="Dosage"
                            value={medicine.dosage}
                            onChange={handleMedicineChange}
                            className="doctor-form-input"
                        />
                        <button
                            type="button"
                            onClick={addMedicine}
                            className="doctor-add-button"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Medicine List Display */}
                <ul className="doctor-medicine-list">
                    {formData.medicineDTOList.map((med, index) => (
                        <li key={index} className="doctor-medicine-item">
                            <span>{med.name}</span>
                            <span>{med.dosage}</span>
                            <button
                                type="button"
                                onClick={() => deleteMedicine(index)}
                                className="doctor-delete-button"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Create and Update Buttons */}
                <div className="doctor-button-group">
                    <button
                        type="button"
                        onClick={handleCreateSubmit}
                        className="doctor-submit-button"
                    >
                        Create Prescription
                    </button>
                    <button
                        type="button"
                        onClick={handleUpdateSubmit}
                        className="doctor-submit-button"
                    >
                        Update Prescription
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorPrescriptionForm;
