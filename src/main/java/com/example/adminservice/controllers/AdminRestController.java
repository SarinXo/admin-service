package com.example.adminservice.controllers;

import com.example.adminservice.dto.Farm;
import com.example.adminservice.services.FarmService;
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

    public AdminRestController(FarmService farmService) {
        this.farmService = farmService;
    }

    @DeleteMapping("/farms/{id}")
    public void deleteById(@PathVariable Integer id){
        farmService.deleteByFarmerCode(id);
    }

    @PutMapping("/farms")
    public Farm modify(@RequestBody Farm farm){
        return farmService.modify(farm);
    }

    @PostMapping("/farms")
    public void save(@RequestBody Farm farm){
        farmService.save(farm);
    }
}
