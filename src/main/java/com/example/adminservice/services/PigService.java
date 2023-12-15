package com.example.adminservice.services;

import com.example.adminservice.dto.Pig;

import java.util.List;

public interface PigService {
    void deleteById(Integer id);
    Pig save(Pig pig);
    Pig modify(Pig pig);
    List<Pig> getPigsBetweenId(Long startId, Long endId);
}
