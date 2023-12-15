package com.example.adminservice.services;

import com.example.adminservice.dto.Order;

import java.util.List;

public interface OrderService {
    void deleteById(Integer id);
    Order save(Order order);
    Order modify(Order order);
    List<Order> getOrdersBetweenId(Long startId, Long endId);
}
