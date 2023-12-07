package com.example.adminservice.services.impl;

import com.example.adminservice.dto.Farm;
import com.example.adminservice.repository.FarmRepository;
import com.example.adminservice.services.FarmService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmServiceImpl implements FarmService {

    private final FarmRepository farmRepository;

    public FarmServiceImpl(FarmRepository farmRepository) {
        this.farmRepository = farmRepository;
    }

    public void deleteByFarmerCode(Integer code){
        farmRepository.deleteByFarmCode(code);
    }

    public Farm modify(Farm farm){
        return save(farm);
    }

    public Farm save(Farm farm){
        if(validate(farm))
            return farmRepository.save(farm);
        return new Farm();// тут нужна ошибка, но пока так
    }

    private boolean validate(Farm farm){
        return farm.getMoney() > 0.0;
    }

    @Override
    public List<Farm> getFarmsBetweenId(Long startId, Long endId) {
        List<Farm> farms = farmRepository.findAllByFarmCodeBetween(startId, endId);
        return farms;
    }
}
