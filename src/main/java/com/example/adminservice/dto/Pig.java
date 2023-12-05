package com.example.adminservice.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "pigs")
public class Pig {
    private Integer id;
    private Integer farmer;
}
