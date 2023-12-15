package com.example.adminservice.services.impl;

import com.example.adminservice.dto.Stern;
import com.example.adminservice.repository.SternRepository;
import com.example.adminservice.services.SternService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SternServiceImpl implements SternService {

    private final SternRepository sternRepository;

    public SternServiceImpl(SternRepository sternRepository) {
        this.sternRepository = sternRepository;
    }

    @Override
    public void deleteById(Integer id) {
        sternRepository.deleteById(id);
    }

    @Override
    public Stern save(Stern stern) {
        return sternRepository.save(stern);
    }

    @Override
    public Stern modify(Stern stern) {
        return sternRepository.save(stern);
    }

    @Override
    public List<Stern> getSternsBetweenId(Long startId, Long endId) {
        return sternRepository.findAllByIdBetween(startId, endId);
    }
}
