package com.ayurgyan.controller;

import com.ayurgyan.model.ScientificStudy;
import com.ayurgyan.model.dto.ApiResponse;
import com.ayurgyan.service.ScientificStudyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/scientific-studies")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:3001"})
public class ScientificStudyController {

    @Autowired
    private ScientificStudyService scientificStudyService;

    @PostMapping
    public ResponseEntity<ApiResponse<ScientificStudy>> createScientificStudy(@Valid @RequestBody ScientificStudy scientificStudy) {
        try {
            System.out.println("=== CREATE SCIENTIFIC STUDY ENDPOINT ===");
            System.out.println("Received scientific study: " + scientificStudy);
            
            ScientificStudy created = scientificStudyService.createScientificStudy(scientificStudy);
            return ResponseEntity.ok(ApiResponse.success("Scientific study created successfully", created));
        } catch (Exception e) {
            System.err.println("Error creating scientific study: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create scientific study: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ScientificStudy>> updateScientificStudy(
            @PathVariable Long id, 
            @Valid @RequestBody ScientificStudy scientificStudy) {
        try {
            System.out.println("=== UPDATE SCIENTIFIC STUDY ENDPOINT ===");
            System.out.println("ID: " + id + ", Data: " + scientificStudy);
            
            ScientificStudy updated = scientificStudyService.updateScientificStudy(id, scientificStudy);
            return ResponseEntity.ok(ApiResponse.success("Scientific study updated successfully", updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("Scientific study not found: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error updating scientific study: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update scientific study: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteScientificStudy(@PathVariable Long id) {
        try {
            System.out.println("=== DELETE SCIENTIFIC STUDY ENDPOINT ===");
            System.out.println("ID: " + id);
            
            scientificStudyService.deleteScientificStudy(id);
            return ResponseEntity.ok(ApiResponse.success("Scientific study deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("Scientific study not found: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error deleting scientific study: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to delete scientific study: " + e.getMessage()));
        }
    }

    @GetMapping("/herb/{herbId}")
    public ResponseEntity<ApiResponse<List<ScientificStudy>>> getScientificStudiesByHerb(@PathVariable Long herbId) {
        try {
            List<ScientificStudy> scientificStudies = scientificStudyService.findByHerbId(herbId);
            return ResponseEntity.ok(ApiResponse.success("Scientific studies retrieved successfully", scientificStudies));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to retrieve scientific studies: " + e.getMessage()));
        }
    }
}