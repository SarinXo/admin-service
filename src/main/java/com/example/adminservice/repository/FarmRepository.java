package com.example.adminservice.repository;

import com.example.adminservice.dto.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface FarmRepository extends JpaRepository<Farm, Integer> {

    void deleteByFarmCode(Integer farmCode);

    List<Farm> findAllByFarmCodeBetween(Long startId, Long endId);

}
