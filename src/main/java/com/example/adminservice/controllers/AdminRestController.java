package com.example.adminservice.controllers;

import com.example.adminservice.dto.Deal;
import com.example.adminservice.dto.Farm;
import com.example.adminservice.services.DealService;
import com.example.adminservice.services.FarmService;
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

    public AdminRestController(FarmService farmService, DealService dealService) {
        this.farmService = farmService;
        this.dealService = dealService;
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
}
