package com.health.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MedicineDTO {
    private String name;
    private String dosage;
}
