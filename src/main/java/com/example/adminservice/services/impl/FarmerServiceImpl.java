package com.example.adminservice.services.impl;

import com.example.adminservice.dto.Farmer;
import com.example.adminservice.repository.FarmerRepository;
import com.example.adminservice.services.FarmerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmerServiceImpl implements FarmerService {

    private final FarmerRepository farmerRepository;

    public FarmerServiceImpl(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    @Override
    public void deleteById(Integer id) {
        farmerRepository.deleteById(id);
    }

    @Override
    public Farmer save(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    @Override
    public Farmer modify(Farmer farmer) {
        return farmerRepository.save(farmer);
    }

    @Override
    public List<Farmer> getFarmsBetweenId(Long startId, Long endId) {
        return farmerRepository.findAllByIdBetween(startId, endId);
    }
}
