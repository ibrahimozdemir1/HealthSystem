package com.health.repository;

import com.health.dto.MedicinePriceDTO;
import com.health.entity.MedicinePrice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PharmacyPrescriptionRepository extends MongoRepository<MedicinePrice, Long> {

    MedicinePriceDTO findByName(String name);

}

