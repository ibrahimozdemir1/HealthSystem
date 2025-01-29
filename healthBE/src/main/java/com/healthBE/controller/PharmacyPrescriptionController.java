package com.health.controller;

import com.health.api.PharmacyPrescriptionApi;
import com.health.dto.MedicinePriceDTO;
import com.health.dto.PharmacyPrescriptionDTO;
import com.health.service.PharmacyPrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pharmacy")
public class PharmacyPrescriptionController implements PharmacyPrescriptionApi {

    private final PharmacyPrescriptionService pharmacyPrescriptionService;


    @Override
    public ResponseEntity<List<PharmacyPrescriptionDTO>> getPharmacyPrescriptionByPatientTc(String patientTc) {
        List<PharmacyPrescriptionDTO> prescriptions = pharmacyPrescriptionService.getPharmacyPrescriptionByPatientTc(patientTc);
        return ResponseEntity.ok(prescriptions);
    }

    @Override
    public ResponseEntity<Boolean> createMedicinePrice(List<MedicinePriceDTO> medicinePriceDTOList) {
        Boolean result = pharmacyPrescriptionService.createPharmacyPrice(medicinePriceDTOList);
        return ResponseEntity.ok(result);
    }

    @Override
    public ResponseEntity<MedicinePriceDTO> getMedicinePriceByName(String name) {
        MedicinePriceDTO medicinePriceDTO = pharmacyPrescriptionService.getMedicinePriceByName(name);
        return ResponseEntity.ok(medicinePriceDTO);
    }

}
