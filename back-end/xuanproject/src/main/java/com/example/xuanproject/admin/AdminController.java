package com.example.xuanproject.admin;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.xuanproject.background.model.BackgroundService;
import com.example.xuanproject.banner.model.BannerService;
import com.example.xuanproject.category.model.CategoryService;
import com.example.xuanproject.category.model.CategoryVO;
import com.example.xuanproject.industry.model.IndustryService;
import com.example.xuanproject.industry.model.IndustryVO;
import com.example.xuanproject.profile.model.ProfileService;
import com.example.xuanproject.profile.model.ProfileVO;
import com.example.xuanproject.project.dto.ProjectApiDTO;
import com.example.xuanproject.project.model.ProjectService;
import com.example.xuanproject.project.model.ProjectVO;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private BannerService bannerService;

    @Autowired
    private BackgroundService backgroundService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private IndustryService industryService;

    @Autowired
    private CategoryService categoryService;


    @PutMapping("/profile/uploadImg") // 更新大頭貼
    public boolean uploadProfileImg(
            @RequestParam("image") MultipartFile file) {

            return profileService.saveOrUpdateProfileImage(file, "profileImg");
    }

    @PutMapping("/profile/uploadProfile") // 編輯個人資料
    public ProfileVO saveOrUpdateProfile(@RequestBody ProfileVO p) {
        return profileService.saveOrUpdateProfile(p);
    }

    @PostMapping("/backImg/upload") // 背景圖片管理
    public boolean uploadBackGroundImg(
            @RequestParam("image") MultipartFile file) {

        return backgroundService.saveOrUpdateBackImg(file, "background");
       
    }

    @PutMapping("/banner/upload") // 更新Banner，圖片太大會無法觸發401導向登入
    public boolean uploadBanner(
            @RequestParam(value = "banners", required = false) List<MultipartFile> banners) {
            

        return bannerService.uploadBanner(banners, "banner");

    }

    @PostMapping("/project/upload") // 上傳作品
    public boolean uploadProject(@ModelAttribute ProjectApiDTO projectApiDTO) {

    
        return projectService.saveProject(projectApiDTO, "project");

    }

    @PutMapping("/project/update") // 更新作品
    public boolean updateProject(@ModelAttribute ProjectApiDTO projectApiDTO) {

       
        return projectService.updateProject(projectApiDTO, "project");

    }

    @DeleteMapping("/project/delete") // 刪除作品
    public ResponseEntity<String> deleteProjectById(@RequestParam("id") int id) {

        if (projectService.deleteProjectById(id)) {
            return ResponseEntity.ok("刪除成功！");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("上傳失敗"); // 404 Not Found
        }
    }

    @PostMapping("/idt/upload") // 新增產業
    public ResponseEntity<String> upload(@RequestParam("industryName") String industryName) {

        IndustryVO i = new IndustryVO();
        i.setIndustryName(industryName);

        if (industryService.saveIndustry(i)) {
            return ResponseEntity.ok("新增成功");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("新增失敗，請稍後再試"); // 404 Not Found
        }

    }

    @DeleteMapping("/idt/delete/{id}") // 刪除產業
    public ResponseEntity<String> deleteIndustry(@PathVariable("id") Integer id) {

        if (industryService.deleteIndustry(id)) {
            return ResponseEntity.ok("刪除成功"); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("刪除失敗，找不到該產業"); // 404 Not Found
        }
    }

    @PostMapping("/cat/upload") // 新增類別
    public ResponseEntity<String> uploadCategory(@RequestParam("category") String category) {

        CategoryVO c = new CategoryVO();
        c.setCategoryName(category);

        if (categoryService.saveCategory(c)) {
            return ResponseEntity.ok("新增成功"); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("新增失敗，請稍後再試"); // 404 Not Found
        }

    }

    @DeleteMapping("/cat/delete/{id}") // 刪除類別
    public ResponseEntity<String> deleteCategory(@PathVariable("id") Integer id) {

        if (categoryService.deleteCategory(id)) {
            return ResponseEntity.ok("刪除成功"); // 200 OK
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("刪除失敗，找不到該類別"); // 404 Not Found
        }
    }

}
