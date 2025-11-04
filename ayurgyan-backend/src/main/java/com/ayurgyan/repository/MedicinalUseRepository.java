package com.ayurgyan.repository;

import com.ayurgyan.model.MedicinalUse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicinalUseRepository extends JpaRepository<MedicinalUse, Long> {
    List<MedicinalUse> findByHerbId(Long herbId);
}