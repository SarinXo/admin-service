package com.example.adminservice.services.impl;

import com.example.adminservice.dto.Deal;
import com.example.adminservice.repository.DealRepository;
import com.example.adminservice.services.DealService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealServiceImpl implements DealService {

    private final DealRepository dealRepository;

    public DealServiceImpl(DealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    @Override
    public void deleteById(Integer id) {
        dealRepository.deleteById(id);
    }

    @Override
    public Deal save(Deal deal) {
        return dealRepository.save(deal);
    }

    @Override
    public Deal modify(Deal deal) {
        return dealRepository.save(deal);
    }

    @Override
    public List<Deal> getFarmsBetweenId(Long startId, Long endId) {
        return dealRepository.findAllByIdBetween(startId, endId);
    }
}
