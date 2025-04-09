package com.example.xuanproject.industry.model;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("industryService")
public class IndustryService {

    @Autowired
    private IndustryRepository industryRepository;

    public List<IndustryVO> getAll() {
        return industryRepository.findAll();
    }

    public boolean saveIndustry(IndustryVO i) {
        try {
            industryRepository.save(i);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteIndustry(int id) {

        if (!industryRepository.existsById(id)) {
            return false;
        }

        industryRepository.deleteById(id);
        return true;

    }
}
