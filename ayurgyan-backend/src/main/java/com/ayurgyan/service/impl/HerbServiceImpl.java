package com.ayurgyan.service.impl;

import com.ayurgyan.model.Herb;
import com.ayurgyan.model.MedicinalUse;
import com.ayurgyan.model.SafetyLevel;
import com.ayurgyan.model.ScientificStudy;
import com.ayurgyan.model.dto.HerbDTO;
import com.ayurgyan.model.dto.MedicinalUseDTO;
import com.ayurgyan.model.dto.ScientificStudyDTO;
import com.ayurgyan.repository.HerbRepository;
import com.ayurgyan.service.HerbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class HerbServiceImpl implements HerbService {

    @Autowired
    private HerbRepository herbRepository;

    @Override
    public List<HerbDTO> getAllHerbs() {
        try {
            System.out.println("=== GET ALL HERBS ===");
            List<Herb> herbs = herbRepository.findAll();
            System.out.println("Found " + herbs.size() + " herbs in database");
            
            List<HerbDTO> result = herbs.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            
            return result;
            
        } catch (Exception e) {
            System.err.println("Error in getAllHerbs: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public Optional<HerbDTO> getHerbById(Long id) {
        try {
            System.out.println("=== GET HERB BY ID: " + id + " ===");
            Optional<Herb> herb = herbRepository.findById(id);
            return herb.map(this::convertToDTO);
        } catch (Exception e) {
            System.err.println("Error in getHerbById: " + e.getMessage());
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Override
    public List<HerbDTO> searchHerbs(String query, String safetyLevel) {
        try {
            System.out.println("=== SEARCH HERBS ===");
            System.out.println("Query: '" + query + "', Safety Level: " + safetyLevel);
            
            List<Herb> herbs;
            
            boolean hasQuery = query != null && !query.trim().isEmpty();
            boolean hasSafetyFilter = safetyLevel != null && !safetyLevel.isEmpty();
            
            if (!hasQuery && !hasSafetyFilter) {
                // No filters - return all herbs
                herbs = herbRepository.findAll();
                System.out.println("No filters, returning all herbs: " + herbs.size());
            }
            else if (!hasQuery && hasSafetyFilter) {
                // Only safety filter - use enum conversion
                try {
                    SafetyLevel safetyEnum = SafetyLevel.valueOf(safetyLevel);
                    herbs = herbRepository.findBySafetyLevel(safetyEnum);
                    System.out.println("Safety filter only, found: " + herbs.size());
                } catch (IllegalArgumentException e) {
                    System.err.println("Invalid safety level: " + safetyLevel + ", returning empty list");
                    herbs = new ArrayList<>();
                }
            }
            else if (hasQuery && !hasSafetyFilter) {
                // Only search query
                herbs = herbRepository.searchHerbs(query.trim());
                System.out.println("Search query only, found: " + herbs.size());
            }
            else {
                // Both search query and safety filter - perform search then filter
                herbs = herbRepository.searchHerbs(query.trim());
                try {
                    SafetyLevel safetyEnum = SafetyLevel.valueOf(safetyLevel);
                    herbs = herbs.stream()
                            .filter(herb -> herb.getSafetyLevel() == safetyEnum)
                            .collect(Collectors.toList());
                    System.out.println("Both search and safety filter, found: " + herbs.size());
                } catch (IllegalArgumentException e) {
                    System.err.println("Invalid safety level: " + safetyLevel + ", using search results only");
                }
            }
            
            // Debug output
            if (!herbs.isEmpty()) {
                System.out.println("Herbs found:");
                herbs.forEach(herb -> 
                    System.out.println(" - " + herb.getName() + " (Safety: " + herb.getSafetyLevel() + ")")
                );
            } else {
                System.out.println("No herbs found matching criteria");
            }
            
            return herbs.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            
        } catch (Exception e) {
            System.err.println("Error in searchHerbs: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public List<HerbDTO> getHerbsBySafetyLevel(String safetyLevel) {
        try {
            System.out.println("=== GET HERBS BY SAFETY LEVEL: " + safetyLevel + " ===");
            
            List<Herb> herbs;
            try {
                SafetyLevel safetyEnum = SafetyLevel.valueOf(safetyLevel);
                herbs = herbRepository.findBySafetyLevel(safetyEnum);
                System.out.println("Found " + herbs.size() + " herbs with safety level: " + safetyLevel);
            } catch (IllegalArgumentException e) {
                System.err.println("Invalid safety level: " + safetyLevel);
                herbs = new ArrayList<>();
            }
            
            return herbs.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            
        } catch (Exception e) {
            System.err.println("Error in getHerbsBySafetyLevel: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    @Override
    public HerbDTO createHerb(Herb herb) {
        try {
            System.out.println("=== CREATE HERB ===");
            System.out.println("Creating herb: " + herb.getName());
            
            if (existsByName(herb.getName())) {
                throw new RuntimeException("Herb with name '" + herb.getName() + "' already exists");
            }
            
            Herb savedHerb = herbRepository.save(herb);
            System.out.println("Herb created successfully with ID: " + savedHerb.getId());
            
            return convertToDTO(savedHerb);
            
        } catch (Exception e) {
            System.err.println("Error in createHerb: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public HerbDTO updateHerb(Long id, Herb herbDetails) {
        try {
            System.out.println("=== UPDATE HERB: " + id + " ===");
            
            Herb herb = herbRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Herb not found with id: " + id));

            System.out.println("Updating herb: " + herb.getName());
            
            // Update fields
            herb.setName(herbDetails.getName());
            herb.setScientificName(herbDetails.getScientificName());
            herb.setDescription(herbDetails.getDescription());
            herb.setSafetyLevel(herbDetails.getSafetyLevel());
            herb.setRegionOfOrigin(herbDetails.getRegionOfOrigin());
            herb.setAverageRating(herbDetails.getAverageRating());
            herb.setImageUrl(herbDetails.getImageUrl());
            herb.setTraditionalUses(herbDetails.getTraditionalUses());
            herb.setActiveCompounds(herbDetails.getActiveCompounds());
            herb.setContraindications(herbDetails.getContraindications());
            herb.setSideEffects(herbDetails.getSideEffects());

            Herb updatedHerb = herbRepository.save(herb);
            System.out.println("Herb updated successfully: " + updatedHerb.getName());
            
            return convertToDTO(updatedHerb);
            
        } catch (Exception e) {
            System.err.println("Error in updateHerb: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public void deleteHerb(Long id) {
        try {
            System.out.println("=== DELETE HERB: " + id + " ===");
            
            Herb herb = herbRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Herb not found with id: " + id));
            
            System.out.println("Deleting herb: " + herb.getName());
            herbRepository.delete(herb);
            System.out.println("Herb deleted successfully");
            
        } catch (Exception e) {
            System.err.println("Error in deleteHerb: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public boolean existsByName(String name) {
        try {
            return herbRepository.existsByName(name);
        } catch (Exception e) {
            System.err.println("Error in existsByName: " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<Herb> getAllHerbsRaw() {
        try {
            System.out.println("=== GET ALL HERBS RAW ===");
            List<Herb> herbs = herbRepository.findAll();
            System.out.println("Returning " + herbs.size() + " raw herb entities");
            return herbs;
        } catch (Exception e) {
            System.err.println("Error in getAllHerbsRaw: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    private HerbDTO convertToDTO(Herb herb) {
        HerbDTO dto = new HerbDTO();
        dto.setId(herb.getId());
        dto.setName(herb.getName());
        dto.setScientificName(herb.getScientificName());
        dto.setDescription(herb.getDescription());
        dto.setSafetyLevel(herb.getSafetyLevel());
        dto.setImageUrl(herb.getImageUrl());
        dto.setTraditionalUses(herb.getTraditionalUses());
        dto.setActiveCompounds(herb.getActiveCompounds());
        dto.setContraindications(herb.getContraindications());
        dto.setSideEffects(herb.getSideEffects());
        dto.setCreatedAt(herb.getCreatedAt());
        dto.setUpdatedAt(herb.getUpdatedAt());

        // Convert medicinal uses
        if (herb.getMedicinalUses() != null) {
            List<MedicinalUseDTO> medicinalUseDTOs = herb.getMedicinalUses().stream()
                    .map(this::convertMedicinalUseToDTO)
                    .collect(Collectors.toList());
            dto.setMedicinalUses(medicinalUseDTOs);
        }

        // Convert scientific studies
        if (herb.getScientificStudies() != null) {
            List<ScientificStudyDTO> studyDTOs = herb.getScientificStudies().stream()
                    .map(this::convertScientificStudyToDTO)
                    .collect(Collectors.toList());
            dto.setScientificStudies(studyDTOs);
        }

        return dto;
    }

    private MedicinalUseDTO convertMedicinalUseToDTO(MedicinalUse medicinalUse) {
        MedicinalUseDTO dto = new MedicinalUseDTO();
        dto.setId(medicinalUse.getId());
        dto.setCondition(medicinalUse.getCondition());
        dto.setPreparation(medicinalUse.getPreparation());
        dto.setDosage(medicinalUse.getDosage());
        dto.setDuration(medicinalUse.getDuration());
        dto.setEvidenceLevel(medicinalUse.getEvidenceLevel());
        return dto;
    }

    private ScientificStudyDTO convertScientificStudyToDTO(ScientificStudy study) {
        ScientificStudyDTO dto = new ScientificStudyDTO();
        dto.setId(study.getId());
        dto.setTitle(study.getTitle());
        dto.setAuthors(study.getAuthors());
        dto.setJournal(study.getJournal());
        dto.setPublicationYear(study.getPublicationYear());
        dto.setDoi(study.getDoi());
        dto.setStudyType(study.getStudyType());
        dto.setEvidenceStrength(study.getEvidenceStrength());
        dto.setFindings(study.getFindings());
        dto.setUrl(study.getUrl());
        return dto;
    }
}