package com.health.controller;

import com.health.api.DoctorPrescriptionApi;
import com.health.dto.DoctorPrescriptionDTO;
import com.health.service.DoctorPrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/doctor")
public class DoctorPrescriptionController implements DoctorPrescriptionApi {

    private final DoctorPrescriptionService doctorPrescriptionService;

    @Override
    public ResponseEntity<Long> createDoctorPrescription(DoctorPrescriptionDTO doctorPrescriptionDTO) {
        var savedPrescriptionId = doctorPrescriptionService.createDoctorPrescription(doctorPrescriptionDTO);
        return ResponseEntity.ok(savedPrescriptionId);
    }

    @Override
    public ResponseEntity<List<DoctorPrescriptionDTO>> getDoctorPrescriptionByPatientTc(String patientTc) {
        List<DoctorPrescriptionDTO> prescriptions = doctorPrescriptionService.getDoctorPrescriptionByPatientTc(patientTc);
        return ResponseEntity.ok(prescriptions);
    }

    @Override
    public ResponseEntity<Long> updateDoctorPrescription(DoctorPrescriptionDTO doctorPrescriptionDTO) {
        var updatedPrescriptionId = doctorPrescriptionService.updateDoctorPrescription(doctorPrescriptionDTO);
        return ResponseEntity.ok(updatedPrescriptionId);
    }

    @Override
    public ResponseEntity<Boolean> deleteDoctorPrescription(Long id) {
        Boolean result = doctorPrescriptionService.deleteDoctorPrescription(id);
        return ResponseEntity.ok(result);
    }
}
