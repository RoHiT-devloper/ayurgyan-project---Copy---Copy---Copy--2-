package com.ayurgyan.repository;

import com.ayurgyan.model.Herb;
import com.ayurgyan.model.SafetyLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HerbRepository extends JpaRepository<Herb, Long> {
    
    Optional<Herb> findByName(String name);
    
    List<Herb> findByScientificNameContainingIgnoreCase(String scientificName);
    
    // Use the enum version directly - Spring Data JPA will handle it
    List<Herb> findBySafetyLevel(SafetyLevel safetyLevel);
    
    List<Herb> findByRegionOfOriginContainingIgnoreCase(String region);
    
    List<Herb> findByAverageRatingGreaterThanEqual(Double rating);
    
    // Simple search without safety filter
    @Query("SELECT DISTINCT h FROM Herb h LEFT JOIN h.medicinalUses mu WHERE " +
           "LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.scientificName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(h.traditionalUses) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(mu.condition) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Herb> searchHerbs(@Param("query") String query);
    
    // Remove the problematic findBySafetyLevelString method
    // @Query("SELECT h FROM Herb h WHERE h.safetyLevel = com.ayurgyan.model.SafetyLevel.valueOf(:safetyLevel)")
    // List<Herb> findBySafetyLevelString(@Param("safetyLevel") String safetyLevel);
    
    // Remove the complex search method and use simpler approach
    // @Query("SELECT DISTINCT h FROM Herb h LEFT JOIN h.medicinalUses mu WHERE " +
    //        "(:query IS NULL OR :query = '' OR " +
    //        "LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
    //        "LOWER(h.scientificName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
    //        "LOWER(h.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
    //        "LOWER(h.traditionalUses) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
    //        "LOWER(mu.condition) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
    //        "(:safetyLevel IS NULL OR :safetyLevel = '' OR h.safetyLevel = com.ayurgyan.model.SafetyLevel.valueOf(:safetyLevel))")
    // List<Herb> searchHerbsWithAdvancedFilters(
    //         @Param("query") String query, 
    //         @Param("safetyLevel") String safetyLevel,
    //         @Param("regionOfOrigin") String regionOfOrigin,
    //         @Param("minRating") Double minRating);
    
    boolean existsByName(String name);
}