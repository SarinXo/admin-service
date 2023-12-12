package com.example.adminservice.repository;

import com.example.adminservice.dto.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Integer> {

    void deleteById(Integer id);

    List<Deal> findAllByIdBetween(Long startId, Long endId);

}