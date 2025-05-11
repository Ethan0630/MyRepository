package com.example.xuanproject.background.model;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.xuanproject.S3.S3Service;

@Service("backgroundService")
public class BackgroundService {

    @Autowired
    private BackgroundRepository backgroundRepository;

    @Autowired
    private S3Service s3Service;

    public boolean saveOrUpdateBackImg(MultipartFile file, String folder) {

        backgroundRepository.deleteAll();

        s3Service.deleteFolderObjects(folder);// 刪除整個資料夾的圖片

        BackgroundVO backgroundVO = new BackgroundVO();

        try {
            String url = s3Service.upload(
                    folder,
                    file.getOriginalFilename(),
                    file.getInputStream(),
                    file.getSize(),
                    file.getContentType());
            backgroundVO.setId(1);
            backgroundVO.setBackgroundImg(url);
            backgroundRepository.save(backgroundVO);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    public BackgroundVO getBackImg() {

        if (backgroundRepository.existsById(1)) {
            return backgroundRepository.findById(1).get();
        }

        return null;

    }
}
