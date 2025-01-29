package com.health.service;

import com.health.dto.DoctorPrescriptionDTO;
import com.health.dto.MedicinePriceDTO;
import com.health.dto.PharmacyPrescriptionDTO;
import com.health.mapper.DoctorPharmacyMapper;
import com.health.repository.DoctorPrescriptionRepository;
import com.health.repository.PharmacyPrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PharmacyPrescriptionService {

    private final PharmacyPrescriptionRepository pharmacyPrescriptionRepository;
    private final DoctorPrescriptionRepository doctorPrescriptionRepository;
    private final DoctorPharmacyMapper doctorPharmacyMapper;
    private final RedisTemplate<String, MedicinePriceDTO> redisTemplate;

    private static final String MEDICINE_PRICE_KEY_PREFIX = "medicine_price:";

    public List<PharmacyPrescriptionDTO> getPharmacyPrescriptionByPatientTc(String patientTc) {
        List<DoctorPrescriptionDTO> doctorPrescriptions = doctorPrescriptionRepository.findByPatientTC(patientTc);
        return doctorPharmacyMapper.mapToPharmacyPrescriptionDTOs(doctorPrescriptions);
    }

    public Boolean createPharmacyPrice(List<MedicinePriceDTO> medicinePriceDTOList) {
        var medicinePriceList = doctorPharmacyMapper.toEntity(medicinePriceDTOList);
        pharmacyPrescriptionRepository.saveAll(medicinePriceList);

        for (MedicinePriceDTO priceDTO : medicinePriceDTOList) {
            redisTemplate.opsForValue().set(MEDICINE_PRICE_KEY_PREFIX + priceDTO.getName(), priceDTO);
        }

        return true;
    }

    public MedicinePriceDTO getMedicinePriceByName(String name) {
        String redisKey = MEDICINE_PRICE_KEY_PREFIX + name;
        MedicinePriceDTO priceDTO = (MedicinePriceDTO) redisTemplate.opsForValue().get(redisKey);

        if (priceDTO != null) {
            return priceDTO;
        }
        priceDTO = pharmacyPrescriptionRepository.findByName(name);

        if (priceDTO != null) {
            redisTemplate.opsForValue().set(redisKey, priceDTO);
        }
        return priceDTO;
    }

}
