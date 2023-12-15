package com.example.adminservice.repository;

import com.example.adminservice.dto.Feedback;
import com.example.adminservice.dto.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    void deleteById(Integer id);
    List<Order> findAllByIdBetween(Long startId, Long endId);
}
