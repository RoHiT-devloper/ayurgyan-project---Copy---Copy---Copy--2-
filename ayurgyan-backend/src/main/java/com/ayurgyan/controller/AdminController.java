// com.ayurgyan.controller.AdminController.java
package com.ayurgyan.controller;

import com.ayurgyan.model.Herb;
import com.ayurgyan.model.dto.ApiResponse;
import com.ayurgyan.service.HerbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:3001"}) // Admin portal port
public class AdminController {

    @Autowired
    private HerbService herbService;

    @GetMapping("/herbs")
    public ResponseEntity<ApiResponse<List<Herb>>> getAllHerbsForAdmin() {
        // You can add admin-specific logic here
        List<Herb> herbs = herbService.getAllHerbsRaw(); // You'll need to create this method
        return ResponseEntity.ok(ApiResponse.success("Herbs retrieved successfully", herbs));
    }

    // Add other admin-specific endpoints
}