package com.example.adminservice.controllers;

import com.example.adminservice.dto.Deal;
import com.example.adminservice.dto.Farm;
import com.example.adminservice.services.DealService;
import com.example.adminservice.services.FarmService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final FarmService farmService;
    private final DealService dealService;

    public AdminController(FarmService farmService, DealService dealService) {
        this.farmService = farmService;
        this.dealService = dealService;
    }

    @GetMapping("/homepage")
    public String getMainPage(){
        return "main-page";
    }
    @GetMapping("/farms")
    public String getFarmsPage(Model model){
        List<Farm> farms = farmService.getFarmsBetweenId(0L, 100L);
        model.addAttribute("listFarms", farms);
        return "/tables/farms";
    }
    @GetMapping("/deals")
    public String getDealsPage(Model model){
        List<Deal> deals = dealService.getFarmsBetweenId(0L, 100L);
        model.addAttribute("listDeals", deals);
        return "/tables/deals";
    }
}
