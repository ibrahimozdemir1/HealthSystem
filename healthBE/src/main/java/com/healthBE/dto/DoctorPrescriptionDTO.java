package com.health.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorPrescriptionDTO {

    @Id
    private Long id;
    private Long doctorId;
    private String patientTC;
    private String fullName;
    private List<MedicineDTO> medicineDTOList;
    private String status;
}
