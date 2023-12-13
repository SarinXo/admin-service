package com.example.adminservice.repository;

import com.example.adminservice.dto.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FarmerRepository extends JpaRepository<Farmer, Integer> {
    void deleteById(Integer id);

    List<Farmer> findAllByIdBetween(Long startId, Long endId);
}
