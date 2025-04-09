package com.example.xuanproject.background.model;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service("backgroundService")
public class BackgroundService {

    @Autowired
    private BackgroundRepository backgroundRepository;

    public boolean saveBackImg(MultipartFile image) {
        BackgroundVO backgroundVO;
        if (!backgroundRepository.existsById(1)) {
            backgroundVO = new BackgroundVO();
        } else {
            backgroundVO = backgroundRepository.findById(1).orElse(null);
        }

        try {
            backgroundVO.setBackgroundImg(image.getBytes());
            backgroundRepository.save(backgroundVO);
            return true;
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return false;
        }

    }

    public BackgroundVO getBackImg() {

        BackgroundVO backgroundVO = backgroundRepository.findById(1).orElse(null);
        Base64.Encoder encoder = Base64.getEncoder();

        if (backgroundRepository.existsById(1)) {

            if (backgroundVO.getBackgroundImg() != null) {
                String base64 = encoder.encodeToString(backgroundVO.getBackgroundImg());
                backgroundVO.setBase64Img1("data:image/jpeg;base64," + base64);
            }

        }

        return backgroundVO;

    }
}
