package com.example.xuanproject;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration // 確保 Spring Boot 掃描這個 CORS 設定
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true); // 允許帶上 Cookie
        config.setAllowedOrigins(Arrays.asList(
            "http://127.0.0.1:5500", "http://localhost:5050",
                "http://localhost:3000", "http://localhost:5000",
                "http://localhost:5001", "http://localhost:3001",
                "http://localhost:3002",
                "http://xuan-project-2025.s3-website-ap-northeast-1.amazonaws.com",
                "http://xuan-project-backstage-2025.s3-website-ap-northeast-1.amazonaws.com")); // 設定允許的前端來源
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 允許的 HTTP 方法
        config.setAllowedHeaders(Arrays.asList("*")); // 允許所有標頭

        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistration() {
        FilterRegistrationBean<CorsFilter> registration = new FilterRegistrationBean<>(corsFilter());
        registration.setOrder(0); // ✅ 優先順序設為最前面
        return registration;
    }
}
