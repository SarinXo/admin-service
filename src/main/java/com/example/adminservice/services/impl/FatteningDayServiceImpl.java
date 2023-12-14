package com.example.adminservice.services.impl;

import com.example.adminservice.dto.FatteningDay;
import com.example.adminservice.repository.FatteningDayRepository;
import com.example.adminservice.services.FatteningDayService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FatteningDayServiceImpl implements FatteningDayService {

    private final FatteningDayRepository fatteningDayRepository;

    public FatteningDayServiceImpl(FatteningDayRepository fatteningDayRepository) {
        this.fatteningDayRepository = fatteningDayRepository;
    }

    @Override
    public void deleteById(Integer id) {
        fatteningDayRepository.deleteById(id);
    }

    @Override
    public FatteningDay save(FatteningDay fatteningDay) {
        return fatteningDayRepository.save(fatteningDay);
    }

    @Override
    public FatteningDay modify(FatteningDay fatteningDay) {
        return fatteningDayRepository.save(fatteningDay);
    }

    @Override
    public List<FatteningDay> getFatteningDaysBetweenId(Long startId, Long endId) {
        return fatteningDayRepository.findAllByFarmCodeBetween(startId, endId);
    }
}
