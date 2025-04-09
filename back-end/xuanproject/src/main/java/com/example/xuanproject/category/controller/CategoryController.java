package com.example.xuanproject.category.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.xuanproject.category.model.CategoryService;
import com.example.xuanproject.category.model.CategoryVO;

@RestController
@RequestMapping("/cat")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getCategories")
    public List<CategoryVO> getCategory() {
        return categoryService.getAll();
    }

}
