import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ScientificStudy } from '../../types/admin';
import './ScientificStudyForm.css';

interface ScientificStudyFormProps {
  scientificStudy?: ScientificStudy | null;
  herbId?: number;
  onSubmit: (data: Partial<ScientificStudy>) => void;
  onCancel: () => void;
  loading?: boolean;
}

const ScientificStudyForm: React.FC<ScientificStudyFormProps> = ({ 
  scientificStudy, 
  herbId,
  onSubmit, 
  onCancel, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    publicationYear: new Date().getFullYear(),
    doi: '',
    studyType: '',
    evidenceStrength: 'MODERATE' as 'WEAK' | 'MODERATE' | 'STRONG' | 'VERY_STRONG',
    findings: '',
    url: '',
    herbId: herbId || 0,
  });

  useEffect(() => {
    if (scientificStudy) {
      setFormData({
        title: scientificStudy.title || '',
        authors: scientificStudy.authors || '',
        journal: scientificStudy.journal || '',
        publicationYear: scientificStudy.publicationYear || new Date().getFullYear(),
        doi: scientificStudy.doi || '',
        studyType: scientificStudy.studyType || '',
        evidenceStrength: scientificStudy.evidenceStrength || 'MODERATE',
        findings: scientificStudy.findings || '',
        url: scientificStudy.url || '',
        herbId: scientificStudy.herbId || herbId || 0,
      });
    } else if (herbId) {
      setFormData(prev => ({ ...prev, herbId }));
    }
  }, [scientificStudy, herbId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'publicationYear' ? parseInt(value) || new Date().getFullYear() : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure herbId is included in the data
    const submitData = {
      ...formData,
      herbId: herbId || scientificStudy?.herbId
    };
    
    onSubmit(submitData);
  };

  return (
    <div className="scientific-study-form-overlay">
      <div className="scientific-study-form-modal">
        <div className="scientific-study-form-header">
          <h2>{scientificStudy ? 'Edit Scientific Study' : 'Add Scientific Study'}</h2>
          <button 
            onClick={onCancel} 
            className="close-button"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="scientific-study-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="title" className="form-label">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter study title"
                disabled={loading}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="authors" className="form-label">
                Authors
              </label>
              <input
                type="text"
                id="authors"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter authors"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="journal" className="form-label">
                Journal
              </label>
              <input
                type="text"
                id="journal"
                name="journal"
                value={formData.journal}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter journal name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="publicationYear" className="form-label">
                Publication Year
              </label>
              <input
                type="number"
                id="publicationYear"
                name="publicationYear"
                value={formData.publicationYear}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter publication year"
                disabled={loading}
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="form-group">
              <label htmlFor="studyType" className="form-label">
                Study Type
              </label>
              <input
                type="text"
                id="studyType"
                name="studyType"
                value={formData.studyType}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter study type"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="evidenceStrength" className="form-label">
                Evidence Strength
              </label>
              <select
                id="evidenceStrength"
                name="evidenceStrength"
                value={formData.evidenceStrength}
                onChange={handleChange}
                className="form-select"
                disabled={loading}
              >
                <option value="WEAK">Weak</option>
                <option value="MODERATE">Moderate</option>
                <option value="STRONG">Strong</option>
                <option value="VERY_STRONG">Very Strong</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="doi" className="form-label">
                DOI
              </label>
              <input
                type="text"
                id="doi"
                name="doi"
                value={formData.doi}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter DOI"
                disabled={loading}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="url" className="form-label">
                URL
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter study URL"
                disabled={loading}
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="findings" className="form-label">
                Findings
              </label>
              <textarea
                id="findings"
                name="findings"
                value={formData.findings}
                onChange={handleChange}
                rows={4}
                className="form-textarea"
                placeholder="Enter study findings"
                disabled={loading}
              />
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
              {loading ? 'Saving...' : (scientificStudy ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScientificStudyForm;