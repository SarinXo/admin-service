package com.example.adminservice.repository;

import com.example.adminservice.dto.FatteningDay;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FatteningDayRepository extends JpaRepository<FatteningDay, Integer> {

    void deleteById(Integer id);

    List<FatteningDay> findAllByFarmCodeBetween(Long startId, Long endId);
}
