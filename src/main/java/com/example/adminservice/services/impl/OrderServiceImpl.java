package com.example.adminservice.services.impl;

import com.example.adminservice.dto.Order;
import com.example.adminservice.repository.OrderRepository;
import com.example.adminservice.services.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public void deleteById(Integer id) {
        orderRepository.deleteById(id);
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public Order modify(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getOrdersBetweenId(Long startId, Long endId) {
        return orderRepository.findAllByIdBetween(startId, endId);
    }
}
