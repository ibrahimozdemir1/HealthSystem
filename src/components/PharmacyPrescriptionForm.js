import React, { useState } from "react";
import { getPharmacyPrescriptionByPatientTc, getMedicinePriceByName } from "../services/api";
import * as XLSX from "xlsx";
import "../formcss/PharmacyPrescriptionForm.css";

const PharmacyPrescriptionForm = () => {
    const [patientTC, setPatientTC] = useState("");
    const [prescriptions, setPrescriptions] = useState([]);
    const [medicineName, setMedicineName] = useState("");
    const [medicinePrice, setMedicinePrice] = useState(null);
    const [addedMedicines, setAddedMedicines] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [medicineNotFoundMessage, setMedicineNotFoundMessage] = useState("");
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [excelData, setExcelData] = useState([]);
    const [uploadSuccessMessage] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");


    const handleSearch = async () => {
        try {
            const response = await getPharmacyPrescriptionByPatientTc(patientTC);
            setPrescriptions(response.data);
            setShowSuggestions(false);
        } catch (error) {
            console.error("Error fetching prescriptions:", error);
        }
    };

    const handleMedicineSearch = async () => {
        try {
            const response = await getMedicinePriceByName(medicineName);
            if (response.data) {
                setMedicinePrice(response.data);
                setMedicineNotFoundMessage("");
            } else {
                setMedicinePrice(null);
                setMedicineNotFoundMessage("The medicine has been ordered and will arrive very soon.");
            }
        } catch (error) {
            console.error("Error fetching medicine price:", error);
            setMedicinePrice(null);
            setMedicineNotFoundMessage("The medicine has been ordered and will arrive very soon.");
        }
    };

    const handleAddMedicine = () => {
        if (medicinePrice) {
            const newMedicine = {
                id: Date.now(),
                name: medicinePrice.name,
                price: medicinePrice.price,
            };

            setAddedMedicines((prevMedicines) => [
                ...prevMedicines,
                newMedicine,
            ]);
            setTotalPrice((prevTotal) => prevTotal + medicinePrice.price);
            setMedicinePrice(null);
            setMedicineName("");

            localStorage.setItem("addedMedicines", JSON.stringify(addedMedicines));
            localStorage.setItem("totalPrice", totalPrice);
        }
    };

    const handleDeleteMedicine = (medicineToDelete) => {
        setAddedMedicines((prevMedicines) => {
            const updatedMedicines = prevMedicines.filter(
                (medicine) => medicine.id !== medicineToDelete.id
            );
            return updatedMedicines;
        });
        setTotalPrice((prevTotal) => prevTotal - medicineToDelete.price);
    };

    const handleMedicineNameChange = (e) => {
        const value = e.target.value;
        setMedicineName(value);

        const filteredSuggestions = excelData.filter((medicine) =>
            medicine.toLowerCase().includes(value.toLowerCase())
        );

        setAutocompleteSuggestions(filteredSuggestions);
        setShowSuggestions(true);
    };

    const handleExcelUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: "binary" });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const medicineNames = json.flat();
                setExcelData(medicineNames);

                setUploadMessage("File successfully uploaded!");

                setTimeout(() => {
                    setUploadMessage("");
                }, 5000);
            };
            reader.readAsBinaryString(file);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Pharmacy Prescription Form</h2>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter Patient TC"
                    value={patientTC}
                    onChange={(e) => setPatientTC(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleSearch} className="button">
                    Search
                </button>
            </div>

            <ul className="pharmacy-prescription-list">
                {prescriptions.length > 0 ? (
                    prescriptions.map((prescription) => (
                        <li key={prescription.id} className="prescription-item">
                            <div>
                                <strong>Pharmacy :</strong> Ozdemir Pharmacy
                            </div>
                            <div>
                                <strong>Patient TC:</strong> {prescription.patientTC}
                            </div>
                            <div>
                                <strong>Full Name:</strong> {prescription.fullName}
                            </div>
                            <div>
                                <strong>PrescriptionId:</strong> {prescription.id}
                            </div>
                            <div>
                                <strong>Medicines:</strong>
                                <ul>
                                    {prescription.medicineDTOList.map((medicine, index) => (
                                        <li key={index}>
                                            <div><strong>name:</strong> {medicine.name}</div>
                                            <div><strong>dosage:</strong> {medicine.dosage}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No prescriptions found.</li>
                )}
            </ul>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter Medicine Name"
                    value={medicineName}
                    onChange={handleMedicineNameChange}
                    className="input-field"
                />
                <button onClick={handleMedicineSearch} className="button">
                    Search Medicine Price
                </button>
                {medicinePrice && (
                    <button onClick={handleAddMedicine} className="button-add">
                        Add
                    </button>
                )}
            </div>

            {showSuggestions && autocompleteSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {autocompleteSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setMedicineName(suggestion);
                                setShowSuggestions(false);
                            }}
                            className="suggestion-item"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}

            {medicinePrice && (
                <div className="medicine-price-info">
                    <div><strong>Medicine:</strong> {medicinePrice.name}</div>
                    <div><strong>Price:</strong> {medicinePrice.price}</div>
                </div>
            )}

            {medicineNotFoundMessage && (
                <div className="medicine-not-found-message">
                    <strong>{medicineNotFoundMessage}</strong>
                </div>
            )}

            <div className="excel-upload">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleExcelUpload}
                    className="button"
                    id="excel-upload-input"
                />
                <label htmlFor="excel-upload-input" className="excel-upload-label">Upload Medicines File</label>

                {/* Upload mesajý */}
                {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
            </div>


            {uploadSuccessMessage && (
                <div className="upload-success-message">
                    <strong>{uploadSuccessMessage}</strong>
                </div>
            )}

            {addedMedicines.length > 0 && (
                <div className="added-medicines">
                    <h3>Added Medicines</h3>
                    <ul>
                        {addedMedicines.map((medicine, index) => (
                            <li key={index} className="added-medicine-item">
                                <div className="medicine-info">
                                    <div className="medicine-name">
                                        <strong>Name:</strong> {medicine.name}
                                    </div>
                                    <div
                                        className="medicine-price">
                                        <strong>Price:</strong>
                                        {medicine.price}
                                    </div>
                                    <button onClick={() => handleDeleteMedicine(medicine)} className="doctor-delete-button">
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="total-price">
                        <strong>Total Price: </strong> {totalPrice}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacyPrescriptionForm;
