package com.ayurgyan.controller;

import com.ayurgyan.model.Herb;
import com.ayurgyan.model.dto.ApiResponse;
import com.ayurgyan.model.dto.HerbDTO;
import com.ayurgyan.service.HerbService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/herbs") // Changed to /api/herbs for consistency
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:3001"})
@Tag(name = "Herbs", description = "Traditional Medicine Herb Management APIs")
public class HerbController {

    @Autowired
    private HerbService herbService;

    @GetMapping
    @Operation(summary = "Get all herbs", description = "Retrieve a list of all herbs in the database")
    public ResponseEntity<ApiResponse<List<HerbDTO>>> getAllHerbs() {
        try {
            System.out.println("=== GET ALL HERBS ENDPOINT CALLED ===");
            List<HerbDTO> herbs = herbService.getAllHerbs();
            System.out.println("Found " + herbs.size() + " herbs");
            return ResponseEntity.ok(ApiResponse.success("Herbs retrieved successfully", herbs));
        } catch (Exception e) {
            System.err.println("Error in getAllHerbs: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve herbs: " + e.getMessage()));
        }
    }

    // Add this method to HerbController.java for backward compatibility
@GetMapping("/herbs")
public ResponseEntity<ApiResponse<List<HerbDTO>>> getAllHerbsLegacy() {
    try {
        System.out.println("=== LEGACY HERBS ENDPOINT CALLED ===");
        List<HerbDTO> herbs = herbService.getAllHerbs();
        System.out.println("Found " + herbs.size() + " herbs");
        return ResponseEntity.ok(ApiResponse.success("Herbs retrieved successfully", herbs));
    } catch (Exception e) {
        System.err.println("Error in getAllHerbsLegacy: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve herbs: " + e.getMessage()));
    }
}

    @GetMapping("/{id}")
    @Operation(summary = "Get herb by ID", description = "Retrieve a specific herb by its ID")
    public ResponseEntity<ApiResponse<HerbDTO>> getHerbById(@PathVariable Long id) {
        try {
            System.out.println("=== GET HERB BY ID: " + id + " ===");
            Optional<HerbDTO> herb = herbService.getHerbById(id);
            if (herb.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success("Herb retrieved successfully", herb.get()));
            } else {
                return ResponseEntity.status(404)
                        .body(ApiResponse.error("Herb not found with id: " + id));
            }
        } catch (Exception e) {
            System.err.println("Error in getHerbById: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve herb: " + e.getMessage()));
        }
    }

    @GetMapping("/search")
    @Operation(summary = "Search herbs", description = "Search herbs by name, scientific name, or description")
    public ResponseEntity<ApiResponse<List<HerbDTO>>> searchHerbs(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String safetyLevel) {
        try {
            System.out.println("=== SEARCH HERBS ===");
            System.out.println("Query: " + query + ", Safety Level: " + safetyLevel);
            
            List<HerbDTO> herbs = herbService.searchHerbs(
                query != null ? query : "", 
                safetyLevel
            );
            System.out.println("Search found " + herbs.size() + " herbs");
            
            return ResponseEntity.ok(ApiResponse.success("Search completed successfully", herbs));
        } catch (Exception e) {
            System.err.println("Error in searchHerbs: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Search failed: " + e.getMessage()));
        }
    }


    @GetMapping("/safety/{safetyLevel}")
    @Operation(summary = "Get herbs by safety level", description = "Retrieve herbs filtered by safety level")
    public ResponseEntity<ApiResponse<List<HerbDTO>>> getHerbsBySafetyLevel(@PathVariable String safetyLevel) {
        try {
            System.out.println("=== GET HERBS BY SAFETY LEVEL: " + safetyLevel + " ===");
            List<HerbDTO> herbs = herbService.getHerbsBySafetyLevel(safetyLevel);
            return ResponseEntity.ok(ApiResponse.success("Herbs retrieved successfully", herbs));
        } catch (Exception e) {
            System.err.println("Error in getHerbsBySafetyLevel: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to retrieve herbs: " + e.getMessage()));
        }
    }
@PostMapping
@Operation(summary = "Create new herb", description = "Add a new herb to the database")
public ResponseEntity<ApiResponse<HerbDTO>> createHerb(@Valid @RequestBody Herb herb) {
    try {
        System.out.println("=== CREATE HERB ENDPOINT CALLED ===");
        System.out.println("Herb name: " + herb.getName());
        System.out.println("Scientific name: " + herb.getScientificName());
        System.out.println("Safety level: " + herb.getSafetyLevel());
        System.out.println("Medicinal uses count: " + (herb.getMedicinalUses() != null ? herb.getMedicinalUses().size() : 0));
        System.out.println("Scientific studies count: " + (herb.getScientificStudies() != null ? herb.getScientificStudies().size() : 0));
        
        if (herbService.existsByName(herb.getName())) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Herb with name '" + herb.getName() + "' already exists"));
        }
        
        // Validate required fields
        if (herb.getName() == null || herb.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Herb name is required"));
        }
        
        HerbDTO createdHerb = herbService.createHerb(herb);
        return ResponseEntity.ok(ApiResponse.success("Herb created successfully", createdHerb));
    } catch (Exception e) {
        System.err.println("Error in createHerb: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to create herb: " + e.getMessage()));
    }
}

    @PutMapping("/{id}")
    @Operation(summary = "Update herb", description = "Update an existing herb's information")
    public ResponseEntity<ApiResponse<HerbDTO>> updateHerb(@PathVariable Long id, @Valid @RequestBody Herb herbDetails) {
        try {
            HerbDTO updatedHerb = herbService.updateHerb(id, herbDetails);
            return ResponseEntity.ok(ApiResponse.success("Herb updated successfully", updatedHerb));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("Herb not found: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error in updateHerb: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to update herb: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete herb", description = "Remove a herb from the database")
    public ResponseEntity<ApiResponse<Void>> deleteHerb(@PathVariable Long id) {
        try {
            herbService.deleteHerb(id);
            return ResponseEntity.ok(ApiResponse.success("Herb deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("Herb not found: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error in deleteHerb: " + e.getMessage());
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to delete herb: " + e.getMessage()));
        }
    }

    // Test endpoint - accessible without authentication
    @GetMapping("/test")
    public ResponseEntity<ApiResponse<String>> test() {
        System.out.println("=== HERBS TEST ENDPOINT CALLED ===");
        return ResponseEntity.ok(ApiResponse.success("Herbs endpoint is working!", null));
    }

    // Health check endpoint
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Object>> healthCheck() {
        try {
            long herbCount = herbService.getAllHerbs().size();
            return ResponseEntity.ok(ApiResponse.success("Herbs service is healthy", Map.of(
                "status", "UP",
                "herbCount", herbCount,
                "timestamp", System.currentTimeMillis()
            )));
        } catch (Exception e) {
            return ResponseEntity.status(503)
                    .body(ApiResponse.error("Herbs service is down: " + e.getMessage()));
        }
    }
}