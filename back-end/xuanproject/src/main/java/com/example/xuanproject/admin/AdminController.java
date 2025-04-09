package com.example.xuanproject.admin;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.example.xuanproject.banner.model.BannerVO;
import com.example.xuanproject.category.model.CategoryService;
import com.example.xuanproject.category.model.CategoryVO;
import com.example.xuanproject.industry.model.IndustryService;
import com.example.xuanproject.industry.model.IndustryVO;
import com.example.xuanproject.profile.model.ProfileService;
import com.example.xuanproject.profile.model.ProfileVO;
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
    public ResponseEntity<Map<String, String>> uploadImg(@RequestParam("image") MultipartFile image) {
        boolean result = false;
        try {
            result = profileService.saveOrUpdateProfileImage(image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        Map<String, String> response = new HashMap<>();
        if (result) {
            response.put("message", "更新成功");
            return ResponseEntity.ok(response); // ✅ 返回 JSON
        } else {
            response.put("message", "更新失敗，請稍後再試");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping("/profile/uploadProfile") // 編輯個人資料
    public ProfileVO saveOrUpdateProfile(@RequestBody ProfileVO p) {
        return profileService.saveOrUpdateProfile(p);
    }

    @PostMapping("/backImg/upload") // 背景圖片管理
    public ResponseEntity<String> uploadBackGroundImg(@RequestParam("image") MultipartFile image) {

        if (backgroundService.saveBackImg(image)) {
            return ResponseEntity.ok("上傳成功！");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("上傳失敗"); // 404 Not Found
        }
    }

    @PutMapping("/banner/upload") // 更新Banner，圖票太大會無法觸發401導向登入
    public BannerVO uploadBanner(
            @RequestParam(value = "banners", required = false) List<MultipartFile> banners) {

        BannerVO bannerVO = new BannerVO();
        bannerVO.setId(1);

        for (int i = 0; i < banners.size(); i++) {
            if (banners.get(i) != null && !banners.get(i).isEmpty()) {
                try {
                    String fieldName = "banner" + (i + 1);
                    Field field = BannerVO.class.getDeclaredField(fieldName);
                    field.setAccessible(true);
                    field.set(bannerVO, banners.get(i).getBytes());
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }

        return bannerService.uploadBanner(bannerVO);

    }

    @PostMapping("/project/upload") // 上傳作品
    public ResponseEntity<String> uploadProject(
            @RequestParam("name") String name,
            @RequestParam("industry") int industry,
            @RequestParam("category") int category,
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam("description") String description) {

        ProjectVO project = new ProjectVO();
        project.setName(name);
        project.setIndustry(industry);
        project.setCategory(category);
        project.setDescription(description);

        System.out.println("===========");
        for (int i = 0; i < images.size(); i++) {
            if (images.get(i) != null && !images.get(i).isEmpty()) { // ✅ 確保檔案有效
                try {
                    String fieldName = "image" + (i + 1); // 生成 image1, image2, ..., image5
                    Field field = ProjectVO.class.getDeclaredField(fieldName);
                    field.setAccessible(true);
                    field.set(project, images.get(i).getBytes()); // ✅ 正確
                } catch (NoSuchFieldException | IllegalAccessException | IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("上傳失敗：" + e.getMessage());
                }
            }
        }

        if (projectService.savePic(project)) {
            return ResponseEntity.ok("上傳成功！");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("上傳失敗"); // 404 Not Found
        }

    }

    @PutMapping("/project/update") // 更新作品
    public ResponseEntity<String> updateProject(
            @RequestParam("id") int id,
            @RequestParam("industry") int industry,
            @RequestParam("category") int category,
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam("description") String description) {

        ProjectVO project = projectService.getProjectById(id);
        project.setIndustry(industry);
        project.setCategory(category);
        project.setDescription(description);

        for (int j = 0; j < 5; j++) {
            try {
                String fieldNameD = "image" + (j + 1);
                Field fieldD = ProjectVO.class.getDeclaredField(fieldNameD);
                fieldD.setAccessible(true);
                fieldD.set(project, null);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("清空圖片失敗：" + e.getMessage());
            }
        }
        for (int i = 0; i < images.size(); i++) {
            if (images.get(i) != null && !images.get(i).isEmpty()) { // ✅ 確保檔案有效
                try {
                    String fieldName = "image" + (i + 1); // 生成 image1, image2, ..., image5
                    Field field = ProjectVO.class.getDeclaredField(fieldName);
                    field.setAccessible(true);
                    field.set(project, images.get(i).getBytes()); // ✅ 正確
                } catch (NoSuchFieldException | IllegalAccessException | IOException e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("上傳失敗：" + e.getMessage());
                }
            }
        }

        if (projectService.savePic(project)) {
            return ResponseEntity.ok("上傳成功！");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("上傳失敗"); // 404 Not Found
        }

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
