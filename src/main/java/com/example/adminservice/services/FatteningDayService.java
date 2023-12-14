package com.example.adminservice.services;

import com.example.adminservice.dto.FatteningDay;

import java.util.List;

public interface FatteningDayService {

    void deleteById(Integer id);
    FatteningDay save(FatteningDay fatteningDay);
    FatteningDay modify(FatteningDay fatteningDay);
    List<FatteningDay> getFatteningDaysBetweenId(Long startId, Long endId);
}
