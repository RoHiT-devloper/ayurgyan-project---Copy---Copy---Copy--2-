package com.ayurgyan.service.impl;

import com.ayurgyan.model.MedicinalUse;
import com.ayurgyan.model.Herb;
import com.ayurgyan.repository.MedicinalUseRepository;
import com.ayurgyan.repository.HerbRepository;
import com.ayurgyan.service.MedicinalUseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicinalUseServiceImpl implements MedicinalUseService {

    @Autowired
    private MedicinalUseRepository medicinalUseRepository;

    @Autowired
    private HerbRepository herbRepository;

    @Override
    public MedicinalUse createMedicinalUse(MedicinalUse medicinalUse) {
        try {
            System.out.println("=== CREATE MEDICINAL USE ===");
            System.out.println("Herb ID: " + (medicinalUse.getHerb() != null ? medicinalUse.getHerb().getId() : "null"));
            System.out.println("Condition: " + medicinalUse.getCondition());
            
            // Validate herb exists
            if (medicinalUse.getHerb() != null && medicinalUse.getHerb().getId() != null) {
                Herb herb = herbRepository.findById(medicinalUse.getHerb().getId())
                        .orElseThrow(() -> new RuntimeException("Herb not found with id: " + medicinalUse.getHerb().getId()));
                medicinalUse.setHerb(herb);
            }
            
            MedicinalUse saved = medicinalUseRepository.save(medicinalUse);
            System.out.println("Medicinal use created with ID: " + saved.getId());
            return saved;
            
        } catch (Exception e) {
            System.err.println("Error creating medicinal use: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public MedicinalUse updateMedicinalUse(Long id, MedicinalUse medicinalUseDetails) {
        try {
            System.out.println("=== UPDATE MEDICINAL USE: " + id + " ===");
            
            MedicinalUse medicinalUse = medicinalUseRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Medicinal use not found with id: " + id));

            medicinalUse.setCondition(medicinalUseDetails.getCondition());
            medicinalUse.setPreparation(medicinalUseDetails.getPreparation());
            medicinalUse.setDosage(medicinalUseDetails.getDosage());
            medicinalUse.setDuration(medicinalUseDetails.getDuration());
            medicinalUse.setEvidenceLevel(medicinalUseDetails.getEvidenceLevel());

            MedicinalUse updated = medicinalUseRepository.save(medicinalUse);
            System.out.println("Medicinal use updated successfully");
            return updated;
            
        } catch (Exception e) {
            System.err.println("Error updating medicinal use: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public void deleteMedicinalUse(Long id) {
        try {
            System.out.println("=== DELETE MEDICINAL USE: " + id + " ===");
            
            MedicinalUse medicinalUse = medicinalUseRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Medicinal use not found with id: " + id));
            medicinalUseRepository.delete(medicinalUse);
            
            System.out.println("Medicinal use deleted successfully");
            
        } catch (Exception e) {
            System.err.println("Error deleting medicinal use: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public Optional<MedicinalUse> findById(Long id) {
        return medicinalUseRepository.findById(id);
    }

    @Override
    public List<MedicinalUse> findByHerbId(Long herbId) {
        return medicinalUseRepository.findByHerbId(herbId);
    }
}