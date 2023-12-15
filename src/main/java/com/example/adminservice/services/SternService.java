package com.example.adminservice.services;

import com.example.adminservice.dto.Stern;

import java.util.List;

public interface SternService {
    void deleteById(Integer id);
    Stern save(Stern stern);
    Stern modify(Stern stern);
    List<Stern> getSternsBetweenId(Long startId, Long endId);
}
