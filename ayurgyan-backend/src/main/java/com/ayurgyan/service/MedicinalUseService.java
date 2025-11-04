package com.ayurgyan.service;

import com.ayurgyan.model.MedicinalUse;
import java.util.List;
import java.util.Optional;

public interface MedicinalUseService {
    
    MedicinalUse createMedicinalUse(MedicinalUse medicinalUse);
    
    MedicinalUse updateMedicinalUse(Long id, MedicinalUse medicinalUse);
    
    void deleteMedicinalUse(Long id);
    
    Optional<MedicinalUse> findById(Long id);
    
    List<MedicinalUse> findByHerbId(Long herbId);
}