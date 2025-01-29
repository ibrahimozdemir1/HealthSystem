package com.health.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Entity
@Table(name = "medicines")
@Data
@Document(collection = "medicine_price")
public class MedicinePrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String name;

    private Double price;

}

