package com.example.xuanproject.pigImg.model;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("PigImgService")
public class PigImgService {

    @Autowired
    private PigImgRepository pigImgRepository;

    public PigImgVO getPigGif() {

        PigImgVO pigVO;

        if (pigImgRepository.existsById(1)) {

            pigVO = pigImgRepository.findById(1).get();

            String base64 = Base64.getEncoder().encodeToString(pigVO.getGifImage());
            pigVO.setBase64img("data:image/gif;base64," + base64);

        } else {

            pigVO = new PigImgVO();

        }

        return pigVO;
    }
}
