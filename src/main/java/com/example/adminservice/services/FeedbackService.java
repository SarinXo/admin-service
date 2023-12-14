package com.example.adminservice.services;

import com.example.adminservice.dto.Feedback;

import java.util.List;

public interface FeedbackService {
    void deleteById(Integer id);
    Feedback save(Feedback feedback);
    Feedback modify(Feedback feedback);
    List<Feedback> getFeedbacksBetweenId(Long startId, Long endId);
}
