import axios from "axios";

const API_URL = "http://localhost:8083/doctor";
const API_URL2 = "http://localhost:8083/pharmacy";

export const createPrescription = async (data) => {
    return await axios.post(`${API_URL}/create-doctor-prescription`, data);
};

export const getPrescriptionsByPatientTC = async (patientTC) => {
    return await axios.get(`${API_URL}/get-doctor-prescription-by-patient-tc/${patientTC}`);
};

export const updatePrescription = async (data) => {
    return await axios.put(`${API_URL}/update-doctor-prescription`, data);
};

export const deletePrescription = async (id) => {
    return await axios.delete(`${API_URL}/delete-doctor-prescription/${id}`);
};


export const getPharmacyPrescriptionByPatientTc = async (patientTc) => {
    return await axios.get(`${API_URL2}/get-pharmacy-prescription-by-patient-tc/${patientTc}`);
};


export const getMedicinePriceByName = async (name) => {
    return await axios.get(`${API_URL2}/get-medicine-price-by-name/${name}`);
};
