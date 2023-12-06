package com.example.adminservice.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "farms")
public class Farm {
    private Integer farmCode;
    private String email;
    private String description;
    private String address;
    private String license;
    private Double money;
}
