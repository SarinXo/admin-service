package com.example.adminservice.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import java.util.Objects;

@Entity
@Table(name = "sterns")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Stern {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "farmer_id")
    private Integer farmerId;
    private String type;
    private Double weight;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Stern stern = (Stern) o;
        return getId() != null && Objects.equals(getId(), stern.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
