package com.example.adminservice.repository;

import com.example.adminservice.dto.Stern;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SternRepository extends JpaRepository<Stern, Integer> {
    void deleteById(Integer id);
    List<Stern> findAllByIdBetween(Long startId, Long endId);
}
