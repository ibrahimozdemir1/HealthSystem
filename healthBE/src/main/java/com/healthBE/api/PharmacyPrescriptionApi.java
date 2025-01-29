package com.health.api;

import com.health.dto.DoctorPrescriptionDTO;
import com.health.dto.MedicinePriceDTO;
import com.health.dto.PharmacyPrescriptionDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface PharmacyPrescriptionApi {

    String PATH_GET_PHARMACY_PRESCRIPTIONS_BY_PATIENT_TC = "/get-pharmacy-prescription-by-patient-tc/{patientTc}";
    String PATH_CREATE_MEDICINE_PRICE = "/create-medicine-price";
    String PATH_GET_MEDICINE_PRICE_BY_NAME = "/get-medicine-price-by-name/{name}";

    @GetMapping(PATH_GET_PHARMACY_PRESCRIPTIONS_BY_PATIENT_TC)
    ResponseEntity<List<PharmacyPrescriptionDTO>> getPharmacyPrescriptionByPatientTc(@PathVariable String patientTc);

    @PostMapping(PATH_CREATE_MEDICINE_PRICE)
    ResponseEntity<Boolean> createMedicinePrice(@RequestBody List<MedicinePriceDTO> medicinePriceDTO);

    @GetMapping(PATH_GET_MEDICINE_PRICE_BY_NAME)
    ResponseEntity<MedicinePriceDTO> getMedicinePriceByName(@PathVariable String name);
}

