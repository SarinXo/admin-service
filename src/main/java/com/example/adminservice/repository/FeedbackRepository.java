package com.example.adminservice.repository;

import com.example.adminservice.dto.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    void deleteById(Integer id);

    List<Feedback> findAllByIdBetween(Long startId, Long endId);
}
