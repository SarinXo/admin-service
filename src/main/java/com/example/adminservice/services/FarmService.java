package com.example.adminservice.services;

import com.example.adminservice.dto.Farm;


import java.util.List;

public interface FarmService {

    void deleteByFarmerCode(Integer code);
    Farm save(Farm farm);
    Farm modify(Farm farm);
    List<Farm> getFarmsBetweenId(Long startId, Long endId);
}
