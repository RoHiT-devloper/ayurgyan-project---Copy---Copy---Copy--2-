package com.ayurgyan.controller;

import com.ayurgyan.model.Herb;
import com.ayurgyan.model.dto.ApiResponse;
import com.ayurgyan.repository.HerbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/minimal")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:5173"})
public class MinimalHerbController {

    @Autowired
    private HerbRepository herbRepository;

    @GetMapping("/herbs")
    public ResponseEntity<ApiResponse<List<Herb>>> getAllHerbsMinimal() {
        try {
            System.out.println("=== MINIMAL HERBS ENDPOINT ===");
            
            List<Herb> herbs = herbRepository.findAll();
            System.out.println("Found " + herbs.size() + " herbs");
            
            // Return raw entities without DTO conversion
            return ResponseEntity.ok(ApiResponse.success("Herbs retrieved successfully", herbs));
            
        } catch (Exception e) {
            System.err.println("=== MINIMAL HERBS ERROR ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to retrieve herbs: " + e.getMessage()));
        }
    }

    @GetMapping("/herbs/{id}")
    public ResponseEntity<ApiResponse<Herb>> getHerbByIdMinimal(@PathVariable Long id) {
        try {
            var herb = herbRepository.findById(id);
            if (herb.isPresent()) {
                return ResponseEntity.ok(ApiResponse.success("Herb retrieved successfully", herb.get()));
            } else {
                return ResponseEntity.status(404)
                        .body(ApiResponse.error("Herb not found with id: " + id));
            }
        } catch (Exception e) {
            System.err.println("Error getting herb: " + e.getMessage());
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to retrieve herb: " + e.getMessage()));
        }
    }
}