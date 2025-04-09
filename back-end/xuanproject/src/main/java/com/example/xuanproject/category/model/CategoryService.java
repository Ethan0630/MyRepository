package com.example.xuanproject.category.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("categoryService")
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryVO> getAll() {
        return categoryRepository.findAll();
    }

    public boolean saveCategory(CategoryVO c) {

        try {
            categoryRepository.save(c); // ✅ 嘗試儲存
            return true; // ✅ 成功回傳 `true`
        } catch (Exception e) {
            e.printStackTrace();
            return false; // ❌ 發生錯誤時回傳 `false`
        }
    }

    public boolean deleteCategory(int id) {

        if (!categoryRepository.existsById(id)) {
            return false;
        }

        categoryRepository.deleteById(id);
        return true;

    }
}
