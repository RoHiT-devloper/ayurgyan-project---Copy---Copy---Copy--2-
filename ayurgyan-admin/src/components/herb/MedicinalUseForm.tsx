import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { MedicinalUse } from '../../types/admin';
import './MedicinalUseForm.css';

interface MedicinalUseFormProps {
  medicinalUse?: MedicinalUse | null;
  herbId?: number;
  onSubmit: (data: Partial<MedicinalUse>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const MedicinalUseForm: React.FC<MedicinalUseFormProps> = ({ 
  medicinalUse, 
  herbId,
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    condition: '',
    preparation: '',
    dosage: '',
    duration: '',
    evidenceLevel: 'TRADITIONAL' as 'TRADITIONAL' | 'ANECDOTAL' | 'SCIENTIFIC',
    herbId: herbId || 0,
  });

  useEffect(() => {
    if (medicinalUse) {
      setFormData({
        condition: medicinalUse.condition || '',
        preparation: medicinalUse.preparation || '',
        dosage: medicinalUse.dosage || '',
        duration: medicinalUse.duration || '',
        evidenceLevel: medicinalUse.evidenceLevel || 'TRADITIONAL',
        herbId: medicinalUse.herbId || herbId || 0,
      });
    } else if (herbId) {
      setFormData(prev => ({ ...prev, herbId }));
    }
  }, [medicinalUse, herbId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure herbId is included in the data
    const submitData = {
      ...formData,
      herbId: herbId || medicinalUse?.herbId
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="medicinal-use-form-overlay">
      <div className="medicinal-use-form-modal">
        <div className="medicinal-use-form-header">
          <h2>{medicinalUse ? 'Edit Medicinal Use' : 'Add Medicinal Use'}</h2>
          <button 
            onClick={onCancel} 
            className="close-button"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="medicinal-use-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="condition" className="form-label">
                Condition *
              </label>
              <input
                type="text"
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter medical condition"
                disabled={loading}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="preparation" className="form-label">
                Preparation
              </label>
              <textarea
                id="preparation"
                name="preparation"
                value={formData.preparation}
                onChange={handleChange}
                rows={3}
                className="form-textarea"
                placeholder="Enter preparation method"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dosage" className="form-label">
                Dosage
              </label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter dosage"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="duration" className="form-label">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter duration"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="evidenceLevel" className="form-label">
                Evidence Level
              </label>
              <select
                id="evidenceLevel"
                name="evidenceLevel"
                value={formData.evidenceLevel}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                <option value="TRADITIONAL">Traditional</option>
                <option value="ANECDOTAL">Anecdotal</option>
                <option value="SCIENTIFIC">Scientific</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (medicinalUse ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicinalUseForm;