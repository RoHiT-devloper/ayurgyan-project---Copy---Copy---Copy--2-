package com.ayurgyan.controller;

import com.ayurgyan.model.MedicinalUse;
import com.ayurgyan.model.dto.ApiResponse;
import com.ayurgyan.service.MedicinalUseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/medicinal-uses")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:3001"})
public class MedicinalUseController {

    @Autowired
    private MedicinalUseService medicinalUseService;

    @PostMapping
    public ResponseEntity<ApiResponse<MedicinalUse>> createMedicinalUse(@Valid @RequestBody MedicinalUse medicinalUse) {
        try {
            System.out.println("=== CREATE MEDICINAL USE ENDPOINT ===");
            System.out.println("Received medicinal use: " + medicinalUse);
            
            MedicinalUse created = medicinalUseService.createMedicinalUse(medicinalUse);
            return ResponseEntity.ok(ApiResponse.success("Medicinal use created successfully", created));
        } catch (Exception e) {
            System.err.println("Error creating medicinal use: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to create medicinal use: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicinalUse>> updateMedicinalUse(
            @PathVariable Long id, 
            @Valid @RequestBody MedicinalUse medicinalUse) {
        try {
            System.out.println("=== UPDATE MEDICINAL USE ENDPOINT ===");
            System.out.println("ID: " + id + ", Data: " + medicinalUse);
            
            MedicinalUse updated = medicinalUseService.updateMedicinalUse(id, medicinalUse);
            return ResponseEntity.ok(ApiResponse.success("Medicinal use updated successfully", updated));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("Medicinal use not found: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error updating medicinal use: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to update medicinal use: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMedicinalUse(@PathVariable Long id) {
        try {
            System.out.println("=== DELETE MEDICinal use ENDPOINT ===");
            System.out.println("ID: " + id);
            
            medicinalUseService.deleteMedicinalUse(id);
            return ResponseEntity.ok(ApiResponse.success("Medicinal use deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(ApiResponse.error("Medicinal use not found: " + e.getMessage()));
        } catch (Exception e) {
            System.err.println("Error deleting medicinal use: " + e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to delete medicinal use: " + e.getMessage()));
        }
    }

    @GetMapping("/herb/{herbId}")
    public ResponseEntity<ApiResponse<List<MedicinalUse>>> getMedicinalUsesByHerb(@PathVariable Long herbId) {
        try {
            List<MedicinalUse> medicinalUses = medicinalUseService.findByHerbId(herbId);
            return ResponseEntity.ok(ApiResponse.success("Medicinal uses retrieved successfully", medicinalUses));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to retrieve medicinal uses: " + e.getMessage()));
        }
    }
}