package com.example.adminservice.services.impl;

import com.example.adminservice.dto.Pig;
import com.example.adminservice.repository.PigRepository;
import com.example.adminservice.services.PigService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PigServiceImpl implements PigService {

    private final PigRepository pigRepository;

    public PigServiceImpl(PigRepository pigRepository) {
        this.pigRepository = pigRepository;
    }

    @Override
    public void deleteById(Integer id) {
        pigRepository.deleteById(id);
    }

    @Override
    public Pig save(Pig pig) {
        return pigRepository.save(pig);
    }

    @Override
    public Pig modify(Pig pig) {
        return pigRepository.save(pig);
    }

    @Override
    public List<Pig> getPigsBetweenId(Long startId, Long endId) {
        return pigRepository.findAllByIdBetween(startId, endId);
    }
}
