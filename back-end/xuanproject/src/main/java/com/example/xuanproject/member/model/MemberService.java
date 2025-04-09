package com.example.xuanproject.member.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("memberService")
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void register() {
        // 1. 把密碼加密
        if (memberRepository.existsById(1)) {
            System.out.print("已經註冊過了");
            return;
        }
        String encodedPassword = passwordEncoder.encode("pigpig");

        // 2. 建立新物件並儲存
        MemberVO member = new MemberVO();
        member.setUsername("kitty88092081@gmail.com");
        member.setPassword(encodedPassword); // 存加密過的密碼！

        memberRepository.save(member);
    }
    // public boolean loginCheck(String username, String password){

    // }
}
