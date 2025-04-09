package com.example.xuanproject.pigImg.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PigImgRepository extends JpaRepository<PigImgVO, Integer> {

}
