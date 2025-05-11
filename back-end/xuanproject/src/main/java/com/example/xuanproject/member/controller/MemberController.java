package com.example.xuanproject.member.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.xuanproject.JwtUtil;
import com.example.xuanproject.member.model.MemberRepository;
import com.example.xuanproject.member.model.MemberService;
import com.example.xuanproject.member.model.MemberVO;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/loginCheck")
    public ResponseEntity<?> loginCheck(
            @RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String password = payload.get("password");

        MemberVO member = memberRepository.findByUsername(username);
        if (member != null && passwordEncoder.matches(password, member.getPassword())) {
            String token = jwtUtil.generateToken(member.getUsername());
            System.out.println("登入成功！");
            return ResponseEntity.ok().body(Map.of("token", token));
        } else {
            System.out.println("登入失敗！");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("帳號或密碼錯誤");
        }
    }

    @GetMapping("/generate")
    public ResponseEntity<String> generate() {
        // 這裡你可以先寫死產生測試資料
        memberService.register();
        return ResponseEntity.ok("假帳號已產生！");
    }
}
