package com.example.adminservice.controllers;

import com.example.adminservice.dto.Deal;
import com.example.adminservice.dto.Farm;
import com.example.adminservice.dto.Farmer;
import com.example.adminservice.dto.FatteningDay;
import com.example.adminservice.dto.Feedback;
import com.example.adminservice.dto.Order;
import com.example.adminservice.dto.Pig;
import com.example.adminservice.dto.Stern;
import com.example.adminservice.services.DealService;
import com.example.adminservice.services.FarmService;
import com.example.adminservice.services.FarmerService;
import com.example.adminservice.services.FatteningDayService;
import com.example.adminservice.services.FeedbackService;
import com.example.adminservice.services.OrderService;
import com.example.adminservice.services.PigService;
import com.example.adminservice.services.SternService;
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
    private final FeedbackService feedbackService;
    private final OrderService orderService;
    private final PigService pigService;
    private final SternService sternService;

    public AdminController(FarmService farmService, DealService dealService, FarmerService farmerService, FatteningDayService fatteningDayService, FeedbackService feedbackService, OrderService orderService, PigService pigService, SternService sternService) {
        this.farmService = farmService;
        this.dealService = dealService;
        this.farmerService = farmerService;
        this.fatteningDayService = fatteningDayService;
        this.feedbackService = feedbackService;
        this.orderService = orderService;
        this.pigService = pigService;
        this.sternService = sternService;
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
    @GetMapping("/feedbacks")
    public String getFeedbackPage(Model model){
        List<Feedback> list = feedbackService.getFeedbacksBetweenId(0L, 100L);
        model.addAttribute("listFeedbacks", list);
        return "/tables/feedbacks";
    }

    @GetMapping("/orders")
    public String getOrderPage(Model model){
        List<Order> list = orderService.getOrdersBetweenId(0L, 100L);
        model.addAttribute("listOrders", list);
        return "/tables/orders";
    }
    @GetMapping("/pigs")
    public String getPigPage(Model model){
        List<Pig> list = pigService.getPigsBetweenId(0L, 100L);
        model.addAttribute("listPigs", list);
        return "/tables/pigs";
    }
    @GetMapping("/sterns")
    public String getSternPage(Model model){
        List<Stern> list = sternService.getSternsBetweenId(0L, 100L);
        model.addAttribute("listSterns", list);
        return "/tables/sterns";
    }
}
