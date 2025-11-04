package com.ayurgyan.controller;

import com.ayurgyan.model.dto.ApiResponse;
import com.ayurgyan.repository.HerbRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    private HerbRepository herbRepository;

    @GetMapping("/database")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkDatabase() {
        try {
            Map<String, Object> result = new HashMap<>();
            
            // Test database connection
            long herbCount = herbRepository.count();
            result.put("database", "CONNECTED");
            result.put("herbCount", herbCount);
            result.put("status", "SUCCESS");
            
            System.out.println("=== DATABASE CHECK ===");
            System.out.println("Herb count: " + herbCount);
            
            return ResponseEntity.ok(ApiResponse.success("Database check completed", result));
            
        } catch (Exception e) {
            System.err.println("=== DATABASE CHECK FAILED ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("database", "ERROR");
            errorResult.put("error", e.getMessage());
            errorResult.put("errorType", e.getClass().getName());
            
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Database check failed: " + e.getMessage(), errorResult));
        }
    }

    @GetMapping("/simple-herbs")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSimpleHerbs() {
        try {
            System.out.println("=== SIMPLE HERBS ENDPOINT ===");
            
            // Try to get herbs without complex conversions
            var herbs = herbRepository.findAll();
            
            Map<String, Object> result = new HashMap<>();
            result.put("count", herbs.size());
            result.put("herbs", herbs.stream()
                .map(herb -> Map.of(
                    "id", herb.getId(),
                    "name", herb.getName(),
                    "scientificName", herb.getScientificName()
                ))
                .toList());
            
            System.out.println("Successfully retrieved " + herbs.size() + " herbs");
            
            return ResponseEntity.ok(ApiResponse.success("Simple herbs retrieved", result));
            
        } catch (Exception e) {
            System.err.println("=== SIMPLE HERBS ERROR ===");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("error", e.getMessage());
            errorResult.put("errorType", e.getClass().getName());
            
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to get simple herbs: " + e.getMessage(), errorResult));
        }
    }
}