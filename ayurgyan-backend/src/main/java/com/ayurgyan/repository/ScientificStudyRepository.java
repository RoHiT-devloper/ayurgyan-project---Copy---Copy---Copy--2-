package com.ayurgyan.repository;

import com.ayurgyan.model.ScientificStudy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScientificStudyRepository extends JpaRepository<ScientificStudy, Long> {
    List<ScientificStudy> findByHerbId(Long herbId);
}