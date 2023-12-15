package com.example.adminservice.repository;

import com.example.adminservice.dto.Order;
import com.example.adminservice.dto.Pig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PigRepository extends JpaRepository<Pig, Integer> {
    void deleteById(Integer id);
    List<Pig> findAllByIdBetween(Long startId, Long endId);
}
