package com.example.adminservice.services;


import com.example.adminservice.dto.Farmer;

import java.util.List;

public interface FarmerService {
    void deleteById(Integer id);
    Farmer save(Farmer farmer);
    Farmer modify(Farmer farmer);
    List<Farmer> getFarmsBetweenId(Long startId, Long endId);
}
