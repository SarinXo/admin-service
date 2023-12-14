package com.example.adminservice.services.impl;

import com.example.adminservice.dto.Feedback;
import com.example.adminservice.repository.FeedbackRepository;
import com.example.adminservice.services.FeedbackService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public void deleteById(Integer id) {
        feedbackRepository.deleteById(id);
    }

    @Override
    public Feedback save(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public Feedback modify(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getFeedbacksBetweenId(Long startId, Long endId) {
        return feedbackRepository.findAllByIdBetween(startId, endId);
    }
}
