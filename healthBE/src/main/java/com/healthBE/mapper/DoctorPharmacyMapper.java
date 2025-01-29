package com.health.mapper;

import com.health.dto.DoctorPrescriptionDTO;
import com.health.dto.MedicinePriceDTO;
import com.health.dto.PharmacyPrescriptionDTO;
import com.health.entity.MedicinePrice;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DoctorPharmacyMapper {

    public List<PharmacyPrescriptionDTO> mapToPharmacyPrescriptionDTOs(List<DoctorPrescriptionDTO> doctorPrescriptions) {
        return doctorPrescriptions.stream().map(this::mapToPharmacyPrescriptionDTO).collect(Collectors.toList());
    }

    private PharmacyPrescriptionDTO mapToPharmacyPrescriptionDTO(DoctorPrescriptionDTO doctorPrescription) {
        PharmacyPrescriptionDTO pharmacyPrescriptionDTO = new PharmacyPrescriptionDTO();
        pharmacyPrescriptionDTO.setId(doctorPrescription.getId());
        pharmacyPrescriptionDTO.setPatientTC(doctorPrescription.getPatientTC());
        pharmacyPrescriptionDTO.setMedicineDTOList(doctorPrescription.getMedicineDTOList());
        pharmacyPrescriptionDTO.setFullName(doctorPrescription.getFullName());
        return pharmacyPrescriptionDTO;
    }

    public MedicinePrice toEntity(MedicinePriceDTO medicinePriceDTO) {
        if (medicinePriceDTO == null) {
            return null;
        }

        MedicinePrice medicinePrice = new MedicinePrice();
        medicinePrice.setName(medicinePriceDTO.getName());
        medicinePrice.setPrice(medicinePriceDTO.getPrice());
        return medicinePrice;
    }

    public List<MedicinePrice> toEntity(List<MedicinePriceDTO> medicinePriceDTOList) {
        if (medicinePriceDTOList == null || medicinePriceDTOList.isEmpty()) {
            return List.of();
        }

        return medicinePriceDTOList.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}
