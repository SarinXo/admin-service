package com.example.adminservice.controllers;

import com.example.adminservice.dto.Deal;
import com.example.adminservice.dto.Farm;
import com.example.adminservice.dto.Farmer;
import com.example.adminservice.dto.FatteningDay;
import com.example.adminservice.services.DealService;
import com.example.adminservice.services.FarmService;
import com.example.adminservice.services.FarmerService;
import com.example.adminservice.services.FatteningDayService;
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
    private final FarmerService farmerService;
    private final FatteningDayService fatteningDayService;

    public AdminController(FarmService farmService, DealService dealService, FarmerService farmerService, FatteningDayService fatteningDayService) {
        this.farmService = farmService;
        this.dealService = dealService;
        this.farmerService = farmerService;
        this.fatteningDayService = fatteningDayService;
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
    @GetMapping("/farmers")
    public String getFarmersPage(Model model){
        List<Farmer> farmers = farmerService.getFarmsBetweenId(0L, 100L);
        model.addAttribute("listFarmers", farmers);
        return "/tables/farmers";
    }
    @GetMapping("/fattening-days")
    public String getFatteningDayPage(Model model){
        List<FatteningDay> list = fatteningDayService.getFatteningDaysBetweenId(0L, 100L);
        model.addAttribute("listFatteningDays", list);
        return "/tables/fattening-days";
    }
}
