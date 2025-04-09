package com.example.xuanproject.industry.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.xuanproject.industry.model.IndustryService;
import com.example.xuanproject.industry.model.IndustryVO;

@RestController
@RequestMapping("/idt")
public class IndustryController {

    @Autowired
    private IndustryService industryService;

    @GetMapping("/getIndustry")
    public List<IndustryVO> getIndustry() {
        return industryService.getAll();
    }

}
