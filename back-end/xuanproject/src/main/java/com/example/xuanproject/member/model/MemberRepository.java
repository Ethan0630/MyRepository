package com.example.xuanproject.member.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberVO, Integer> {

    @Query(value = "SELECT * FROM member WHERE username = :username AND password = :password", nativeQuery = true)
    MemberVO loginCheck(@Param("username") String username, @Param("password") String password);

    MemberVO findByUsername(String username);
}
