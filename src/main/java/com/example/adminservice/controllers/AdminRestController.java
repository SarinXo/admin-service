package com.example.adminservice.controllers;

import com.example.adminservice.dto.Deal;
import com.example.adminservice.dto.Farm;
import com.example.adminservice.dto.Farmer;
import com.example.adminservice.dto.FatteningDay;
import com.example.adminservice.dto.Feedback;
import com.example.adminservice.services.DealService;
import com.example.adminservice.services.FarmService;
import com.example.adminservice.services.FarmerService;
import com.example.adminservice.services.FatteningDayService;
import com.example.adminservice.services.FeedbackService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin-rest")
public class AdminRestController {

    private final FarmService farmService;
    private final DealService dealService;
    private final FarmerService farmerService;
    private final FatteningDayService fatteningDayService;
    private final FeedbackService feedbackService;

    public AdminRestController(FarmService farmService, DealService dealService, FarmerService farmerService, FatteningDayService fatteningDayService, FeedbackService feedbackService) {
        this.farmService = farmService;
        this.dealService = dealService;
        this.farmerService = farmerService;
        this.fatteningDayService = fatteningDayService;
        this.feedbackService = feedbackService;
    }

    @Transactional
    @DeleteMapping("/farms/{id}")
    public void deleteFarmById(@PathVariable Integer id){
        farmService.deleteByFarmerCode(id);
    }

    @PutMapping("/farms")
    public Farm modifyFarm(@RequestBody Farm farm){
        return farmService.modify(farm);
    }

    @PostMapping("/farms")
    public Farm saveFarm(@RequestBody Farm farm){
        return farmService.save(farm);
    }

    @Transactional
    @DeleteMapping("/deals/{id}")
    public void deleteDealById(@PathVariable Integer id){
        dealService.deleteById(id);
    }

    @PutMapping("/deals")
    public Deal modifyDeal(@RequestBody Deal deal){
        return dealService.modify(deal);
    }

    @PostMapping("/deals")
    public Deal saveDeal(@RequestBody Deal deal){
        return dealService.save(deal);
    }

    @Transactional
    @DeleteMapping("/farmers/{id}")
    public void deleteFarmerById(@PathVariable Integer id){
        farmerService.deleteById(id);
    }

    @PutMapping("/farmers")
    public Farmer modifyFarmer(@RequestBody Farmer farmer){
        return farmerService.modify(farmer);
    }

    @PostMapping("/farmers")
    public Farmer saveFarmer(@RequestBody Farmer farmer){
        return farmerService.save(farmer);
    }

    @Transactional
    @DeleteMapping("/fattening-days/{id}")
    public void deleteFatteningDayById(@PathVariable Integer id){
        fatteningDayService.deleteById(id);
    }

    @PutMapping("/fattening-days")
    public FatteningDay modifyFatteningDay(@RequestBody FatteningDay fatteningDay){
        return fatteningDayService.modify(fatteningDay);
    }

    @PostMapping("/fattening-days")
    public FatteningDay saveFatteningDay(@RequestBody FatteningDay fatteningDay) {
        return fatteningDayService.save(fatteningDay);
    }

    @Transactional
    @DeleteMapping("/feedbacks/{id}")
    public void deleteFeedbackDayById(@PathVariable Integer id){
        feedbackService.deleteById(id);
    }

    @PutMapping("/feedbacks")
    public Feedback modifyFeedback(@RequestBody Feedback fatteningDay){
        return feedbackService.modify(fatteningDay);
    }

    @PostMapping("/feedbacks")
    public Feedback saveFeedback(@RequestBody Feedback feedback){
        return feedbackService.save(feedback);
    }
}
