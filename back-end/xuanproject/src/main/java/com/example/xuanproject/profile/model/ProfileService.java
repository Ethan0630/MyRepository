package com.example.xuanproject.profile.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.xuanproject.S3.S3Service;

@Service("ProfileService")
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private S3Service s3Service;

    public boolean saveOrUpdateProfileImage(MultipartFile file, String folder) {

        ProfileVO profile;

        if (profileRepository.existsById(1)) {

            profile = profileRepository.findById(1).get();

            if (profile.getProfilePic() != null) {
                s3Service.deleteFolderObjects("profileImg");// 刪除整個資料夾的圖片
            }
        } else {
            profile = new ProfileVO();
        }

        try {
            String url = s3Service.upload(
                    folder,
                    file.getOriginalFilename(),
                    file.getInputStream(),
                    file.getSize(),
                    file.getContentType());

            profile.setProfilePic(url);
            profileRepository.save(profile);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    public ProfileVO getProfile() {

        // 如果資料庫沒有這個 Profile，則回傳一個新的 ProfileVO 物件
        return profileRepository.existsById(1) ? profileRepository.findById(1).get() : new ProfileVO();
    }

    public ProfileVO saveOrUpdateProfile(ProfileVO p) {

        ProfileVO profile;

        if (profileRepository.existsById(1)) { // 可能有照片
            profile = profileRepository.findById(1).get();
            profile.setName(p.getName());
            profile.setOccupation(p.getOccupation());
            profile.setEducation(p.getEducation());
            profile.setRegion(p.getRegion());
            profile.setSnsName(p.getSnsName());
            profile.setSns(p.getSns());
        } else {
            profile = new ProfileVO(p);
        }

        return profileRepository.save(profile);
    }
}
