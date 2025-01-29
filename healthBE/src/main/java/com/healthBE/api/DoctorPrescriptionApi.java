package com.health.api;

import com.health.dto.DoctorPrescriptionDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface DoctorPrescriptionApi {

    String PATH_CREATE_DOCTOR_PRESCRIPTION = "/create-doctor-prescription";
    String PATH_GET_DOCTOR_PRESCRIPTIONS_BY_PATIENT_TC = "/get-doctor-prescription-by-patient-tc/{patientTc}";
    String PATH_UPDATE_DOCTOR_PRESCRIPTIONS = "/update-doctor-prescription";
    String PATH_DELETE_DOCTOR_PRESCRIPTIONS = "/delete-doctor-prescription/{id}";

    @PostMapping(PATH_CREATE_DOCTOR_PRESCRIPTION)
    ResponseEntity<Long> createDoctorPrescription(@RequestBody DoctorPrescriptionDTO doctorPrescriptionDTO);

    @GetMapping(PATH_GET_DOCTOR_PRESCRIPTIONS_BY_PATIENT_TC)
    ResponseEntity<List<DoctorPrescriptionDTO>> getDoctorPrescriptionByPatientTc(@PathVariable String patientTc);

    @PutMapping(PATH_UPDATE_DOCTOR_PRESCRIPTIONS)
    ResponseEntity<Long> updateDoctorPrescription(@RequestBody DoctorPrescriptionDTO doctorPrescriptionDTO);

    @DeleteMapping(PATH_DELETE_DOCTOR_PRESCRIPTIONS)
    ResponseEntity<Boolean> deleteDoctorPrescription(@PathVariable Long id);
}
