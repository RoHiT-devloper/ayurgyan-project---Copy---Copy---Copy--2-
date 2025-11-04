package com.ayurgyan.service.impl;

import com.ayurgyan.model.ScientificStudy;
import com.ayurgyan.model.Herb;
import com.ayurgyan.repository.ScientificStudyRepository;
import com.ayurgyan.repository.HerbRepository;
import com.ayurgyan.service.ScientificStudyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScientificStudyServiceImpl implements ScientificStudyService {

    @Autowired
    private ScientificStudyRepository scientificStudyRepository;

    @Autowired
    private HerbRepository herbRepository;

    @Override
    public ScientificStudy createScientificStudy(ScientificStudy scientificStudy) {
        try {
            System.out.println("=== CREATE SCIENTIFIC STUDY ===");
            System.out.println("Herb ID: " + (scientificStudy.getHerb() != null ? scientificStudy.getHerb().getId() : "null"));
            System.out.println("Title: " + scientificStudy.getTitle());
            
            // Validate herb exists
            if (scientificStudy.getHerb() != null && scientificStudy.getHerb().getId() != null) {
                Herb herb = herbRepository.findById(scientificStudy.getHerb().getId())
                        .orElseThrow(() -> new RuntimeException("Herb not found with id: " + scientificStudy.getHerb().getId()));
                scientificStudy.setHerb(herb);
            }
            
            ScientificStudy saved = scientificStudyRepository.save(scientificStudy);
            System.out.println("Scientific study created with ID: " + saved.getId());
            return saved;
            
        } catch (Exception e) {
            System.err.println("Error creating scientific study: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public ScientificStudy updateScientificStudy(Long id, ScientificStudy scientificStudyDetails) {
        try {
            System.out.println("=== UPDATE SCIENTIFIC STUDY: " + id + " ===");
            
            ScientificStudy scientificStudy = scientificStudyRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Scientific study not found with id: " + id));

            scientificStudy.setTitle(scientificStudyDetails.getTitle());
            scientificStudy.setAuthors(scientificStudyDetails.getAuthors());
            scientificStudy.setJournal(scientificStudyDetails.getJournal());
            scientificStudy.setPublicationYear(scientificStudyDetails.getPublicationYear());
            scientificStudy.setDoi(scientificStudyDetails.getDoi());
            scientificStudy.setStudyType(scientificStudyDetails.getStudyType());
            scientificStudy.setEvidenceStrength(scientificStudyDetails.getEvidenceStrength());
            scientificStudy.setFindings(scientificStudyDetails.getFindings());
            scientificStudy.setUrl(scientificStudyDetails.getUrl());

            ScientificStudy updated = scientificStudyRepository.save(scientificStudy);
            System.out.println("Scientific study updated successfully");
            return updated;
            
        } catch (Exception e) {
            System.err.println("Error updating scientific study: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public void deleteScientificStudy(Long id) {
        try {
            System.out.println("=== DELETE SCIENTIFIC STUDY: " + id + " ===");
            
            ScientificStudy scientificStudy = scientificStudyRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Scientific study not found with id: " + id));
            scientificStudyRepository.delete(scientificStudy);
            
            System.out.println("Scientific study deleted successfully");
            
        } catch (Exception e) {
            System.err.println("Error deleting scientific study: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public Optional<ScientificStudy> findById(Long id) {
        return scientificStudyRepository.findById(id);
    }

    @Override
    public List<ScientificStudy> findByHerbId(Long herbId) {
        return scientificStudyRepository.findByHerbId(herbId);
    }
}