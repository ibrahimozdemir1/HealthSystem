package com.health.repository;

import com.health.dto.DoctorPrescriptionDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DoctorPrescriptionRepository extends MongoRepository<DoctorPrescriptionDTO, Long> {

    List<DoctorPrescriptionDTO> findByPatientTC(String patientTC);

}
