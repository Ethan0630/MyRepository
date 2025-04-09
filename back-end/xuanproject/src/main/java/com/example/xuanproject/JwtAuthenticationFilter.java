package com.example.xuanproject;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod();

        System.out.println("[JWT Filter] 路徑: " + method + " " + path);

        // ✅ 預檢請求 (preflight) 放行，並加上 CORS header
        if ("OPTIONS".equalsIgnoreCase(method)) {
            setCorsHeaders(response);
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // ✅ 只針對 /admin/ 開頭的 API 做 JWT 驗證
        if (path.startsWith("/admin/")) {
            String authHeader = request.getHeader("Authorization");
            System.out.println("🪪 Token: " + authHeader);

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);

                // 防止 null 或 "null" 當成 token 傳進來
                if (token == null || token.trim().isEmpty() || "null".equals(token)) {
                    deny(response);
                    return;
                }

                // 驗證 token
                String username = jwtUtil.validateTokenAndGetUsername(token);
                if (username == null) {
                    deny(response);
                    return;
                }

                // 驗證成功
                System.out.println("✅ token 驗證成功，使用者: " + username);
            } else {
                // 沒有帶 Authorization header
                deny(response);
                return;
            }
        }

        // ✅ 正常繼續請求流程
        filterChain.doFilter(request, response);
    }

    private void deny(HttpServletResponse response) throws IOException {
        // ✅ 不寫入任何錯誤訊息（避免 multipart 請求錯誤），只設 401 和 CORS headers
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        System.out.println("❌ 驗證失敗：token 無效或過期");
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    }
}
