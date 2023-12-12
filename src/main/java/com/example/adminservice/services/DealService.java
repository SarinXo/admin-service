package com.example.adminservice.services;

import com.example.adminservice.dto.Deal;

import java.util.List;

public interface DealService {

    void deleteById(Integer id);
    Deal save(Deal deal);
    Deal modify(Deal deal);

    List<Deal> getFarmsBetweenId(Long startId, Long endId);
}
