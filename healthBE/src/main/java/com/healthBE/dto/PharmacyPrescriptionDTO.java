package com.health.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PharmacyPrescriptionDTO {

    @Id
    private Long id;
    private String patientTC;
    private String fullName;
    private List<MedicineDTO> medicineDTOList;
}
