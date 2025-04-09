package com.example.xuanproject.profile.model;

import java.util.Base64;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("ProfileService")
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public boolean saveOrUpdateProfileImage(byte[] profilePic) {

        Optional<ProfileVO> existingProfile = profileRepository.findById(1);
        ProfileVO profile;

        if (existingProfile.isPresent()) {
            profile = existingProfile.get();
        } else {
            profile = new ProfileVO();
        }

        profile.setProfilePic(profilePic);
        profileRepository.save(profile);

        if (profileRepository.count() == 1) {
            return true;
        } else {
            return false;
        }
    }

    public ProfileVO getProfile() {
        Optional<ProfileVO> existingProfile = profileRepository.findById(1);
        // 如果資料庫沒有這個 Profile，則回傳一個新的 ProfileVO 物件
        ProfileVO profile = existingProfile.orElse(new ProfileVO());

        if (profile.getProfilePic() != null) {
            profile.setBase64Img(
                    ("data:image/png;base64," + Base64.getEncoder().encodeToString(profile.getProfilePic())));
        }

        return profile;
    }

    public ProfileVO saveOrUpdateProfile(ProfileVO p) {
        Optional<ProfileVO> existingProfile = profileRepository.findById(1);
        ProfileVO profile;

        if (existingProfile.isPresent()) { // 可能有照片
            profile = existingProfile.get();
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
