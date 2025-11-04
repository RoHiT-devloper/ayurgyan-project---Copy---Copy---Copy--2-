package com.ayurgyan.service;

import com.ayurgyan.model.ScientificStudy;
import java.util.List;
import java.util.Optional;

public interface ScientificStudyService {
    
    ScientificStudy createScientificStudy(ScientificStudy scientificStudy);
    
    ScientificStudy updateScientificStudy(Long id, ScientificStudy scientificStudy);
    
    void deleteScientificStudy(Long id);
    
    Optional<ScientificStudy> findById(Long id);
    
    List<ScientificStudy> findByHerbId(Long herbId);
}