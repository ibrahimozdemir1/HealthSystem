package com.health.service;

import com.health.dto.DoctorPrescriptionDTO;
import com.health.repository.DoctorPrescriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorPrescriptionService {

    private final DoctorPrescriptionRepository doctorPrescriptionRepository;

    public DoctorPrescriptionService(DoctorPrescriptionRepository doctorPrescriptionRepository) {
        this.doctorPrescriptionRepository = doctorPrescriptionRepository;
    }

    public Long createDoctorPrescription(DoctorPrescriptionDTO doctorPrescriptionDTO) {
        if (doctorPrescriptionRepository.existsById(doctorPrescriptionDTO.getId())) {
            throw new IllegalArgumentException("A prescription with this ID already exists.");
        }
        DoctorPrescriptionDTO savedPrescription = doctorPrescriptionRepository.save(doctorPrescriptionDTO);
        return savedPrescription.getId();
    }


    public List<DoctorPrescriptionDTO> getDoctorPrescriptionByPatientTc(String patientTc) {
        return doctorPrescriptionRepository.findByPatientTC(patientTc);
    }

    public Long updateDoctorPrescription(DoctorPrescriptionDTO doctorPrescriptionDTO) {
        var existingPrescription = doctorPrescriptionRepository.findById(doctorPrescriptionDTO.getId());
        if (existingPrescription.isPresent()) {
            DoctorPrescriptionDTO updatedPrescription = doctorPrescriptionRepository.save(doctorPrescriptionDTO);
            return updatedPrescription.getId();
        } else {
            throw new RuntimeException("Prescription not found");
        }
    }


    public Boolean deleteDoctorPrescription(Long id) {
        Optional<DoctorPrescriptionDTO> prescription = doctorPrescriptionRepository.findById(id);
        if (prescription.isPresent()) {
            doctorPrescriptionRepository.delete(prescription.get());
            return Boolean.TRUE;
        } else {
            throw new RuntimeException("Prescription not found");
        }
    }
}
