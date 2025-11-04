import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { Herb, MedicinalUse, ScientificStudy } from '../../types/admin';
import MedicinalUseForm from './MedicinalUseForm';
import ScientificStudyForm from './ScientificStudyForm';
import './HerbForm.css';

interface HerbFormProps {
  herb?: Herb | null;
  onSubmit: (data: Partial<Herb>) => void;
  onCancel: () => void;
  loading?: boolean;
  onMedicinalUseCreate?: (data: Partial<MedicinalUse>) => Promise<void>;
  onMedicinalUseUpdate?: (id: number, data: Partial<MedicinalUse>) => Promise<void>;
  onMedicinalUseDelete?: (id: number) => Promise<void>;
  onScientificStudyCreate?: (data: Partial<ScientificStudy>) => Promise<void>;
  onScientificStudyUpdate?: (id: number, data: Partial<ScientificStudy>) => Promise<void>;
  onScientificStudyDelete?: (id: number) => Promise<void>;
}

const HerbForm: React.FC<HerbFormProps> = ({ 
  herb, 
  onSubmit, 
  onCancel, 
  loading = false,
  onMedicinalUseCreate,
  onMedicinalUseUpdate,
  onMedicinalUseDelete,
  onScientificStudyCreate,
  onScientificStudyUpdate,
  onScientificStudyDelete,
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'medicinal' | 'studies'>('basic');
  const [showMedicinalUseForm, setShowMedicinalUseForm] = useState(false);
  const [showScientificStudyForm, setShowScientificStudyForm] = useState(false);
  const [editingMedicinalUse, setEditingMedicinalUse] = useState<MedicinalUse | null>(null);
  const [editingScientificStudy, setEditingScientificStudy] = useState<ScientificStudy | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    description: '',
    safetyLevel: 'SAFE' as 'SAFE' | 'CAUTION' | 'RESTRICTED',
    imageUrl: '',
    traditionalUses: '',
    activeCompounds: '',
    contraindications: '',
    sideEffects: '',
  });

  useEffect(() => {
    if (herb) {
      setFormData({
        name: herb.name || '',
        scientificName: herb.scientificName || '',
        description: herb.description || '',
        safetyLevel: herb.safetyLevel || 'SAFE',
        imageUrl: herb.imageUrl || '',
        traditionalUses: herb.traditionalUses || '',
        activeCompounds: herb.activeCompounds || '',
        contraindications: herb.contraindications || '',
        sideEffects: herb.sideEffects || '',
      });
    }
  }, [herb]);

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
    onSubmit(formData);
  };

  const handleMedicinalUseSubmit = async (data: Partial<MedicinalUse>) => {
    if (!herb?.id) return;
    
    setFormLoading(true);
    try {
      if (editingMedicinalUse) {
        await onMedicinalUseUpdate?.(editingMedicinalUse.id, { ...data, herbId: herb.id });
      } else {
        await onMedicinalUseCreate?.({ ...data, herbId: herb.id });
      }
      setShowMedicinalUseForm(false);
      setEditingMedicinalUse(null);
    } catch (error) {
      console.error('Error saving medicinal use:', error);
      alert('Failed to save medicinal use. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleScientificStudySubmit = async (data: Partial<ScientificStudy>) => {
    if (!herb?.id) return;
    
    setFormLoading(true);
    try {
      if (editingScientificStudy) {
        await onScientificStudyUpdate?.(editingScientificStudy.id, { ...data, herbId: herb.id });
      } else {
        await onScientificStudyCreate?.({ ...data, herbId: herb.id });
      }
      setShowScientificStudyForm(false);
      setEditingScientificStudy(null);
    } catch (error) {
      console.error('Error saving scientific study:', error);
      alert('Failed to save scientific study. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteMedicinalUse = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this medicinal use?')) {
      try {
        await onMedicinalUseDelete?.(id);
      } catch (error) {
        console.error('Error deleting medicinal use:', error);
        alert('Failed to delete medicinal use. Please try again.');
      }
    }
  };

  const handleDeleteScientificStudy = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this scientific study?')) {
      try {
        await onScientificStudyDelete?.(id);
      } catch (error) {
        console.error('Error deleting scientific study:', error);
        alert('Failed to delete scientific study. Please try again.');
      }
    }
  };

  const renderBasicInfoTab = () => (
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Herb Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Enter herb name"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="scientificName" className="form-label">Scientific Name</label>
        <input
          type="text"
          id="scientificName"
          name="scientificName"
          value={formData.scientificName}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter scientific name"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="safetyLevel" className="form-label">Safety Level</label>
        <select
          id="safetyLevel"
          name="safetyLevel"
          value={formData.safetyLevel}
          onChange={handleChange}
          className="form-select"
          disabled={loading}
        >
          <option value="SAFE">Safe</option>
          <option value="CAUTION">Caution</option>
          <option value="RESTRICTED">Restricted</option>
        </select>
      </div>

      <div className="form-group full-width">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="form-textarea"
          placeholder="Enter herb description"
          disabled={loading}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="imageUrl" className="form-label">Image URL</label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter image URL"
          disabled={loading}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="traditionalUses" className="form-label">Traditional Uses</label>
        <textarea
          id="traditionalUses"
          name="traditionalUses"
          value={formData.traditionalUses}
          onChange={handleChange}
          rows={3}
          className="form-textarea"
          placeholder="Enter traditional uses"
          disabled={loading}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="activeCompounds" className="form-label">Active Compounds</label>
        <input
          type="text"
          id="activeCompounds"
          name="activeCompounds"
          value={formData.activeCompounds}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter active compounds (comma separated)"
          disabled={loading}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="contraindications" className="form-label">Contraindications</label>
        <textarea
          id="contraindications"
          name="contraindications"
          value={formData.contraindications}
          onChange={handleChange}
          rows={3}
          className="form-textarea"
          placeholder="Enter contraindications"
          disabled={loading}
        />
      </div>

      <div className="form-group full-width">
        <label htmlFor="sideEffects" className="form-label">Side Effects</label>
        <textarea
          id="sideEffects"
          name="sideEffects"
          value={formData.sideEffects}
          onChange={handleChange}
          rows={3}
          className="form-textarea"
          placeholder="Enter side effects"
          disabled={loading}
        />
      </div>
    </div>
  );

  const renderMedicinalUsesTab = () => (
    <div className="related-items-tab">
      <div className="tab-header">
        <h3>Medicinal Uses</h3>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowMedicinalUseForm(true)}
          disabled={!herb?.id}
        >
          <Plus size={16} />
          Add Medicinal Use
        </button>
      </div>

      {!herb?.id ? (
        <div className="empty-state">
          <p>Save the herb first to add medicinal uses.</p>
        </div>
      ) : herb.medicinalUses.length === 0 ? (
        <div className="empty-state">
          <p>No medicinal uses added yet.</p>
        </div>
      ) : (
        <div className="items-list">
          {herb.medicinalUses.map((use) => (
            <div key={use.id} className="item-card">
              <div className="item-content">
                <h4>{use.condition}</h4>
                <p className="item-details">
                  {use.preparation && <span>Preparation: {use.preparation}</span>}
                  {use.dosage && <span>Dosage: {use.dosage}</span>}
                  {use.duration && <span>Duration: {use.duration}</span>}
                  <span className={`badge badge-${use.evidenceLevel.toLowerCase()}`}>
                    {use.evidenceLevel}
                  </span>
                </p>
              </div>
              <div className="item-actions">
                <button
                  className="btn-action btn-edit"
                  onClick={() => {
                    setEditingMedicinalUse(use);
                    setShowMedicinalUseForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => handleDeleteMedicinalUse(use.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderScientificStudiesTab = () => (
    <div className="related-items-tab">
      <div className="tab-header">
        <h3>Scientific Studies</h3>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowScientificStudyForm(true)}
          disabled={!herb?.id}
        >
          <Plus size={16} />
          Add Scientific Study
        </button>
      </div>

      {!herb?.id ? (
        <div className="empty-state">
          <p>Save the herb first to add scientific studies.</p>
        </div>
      ) : herb.scientificStudies.length === 0 ? (
        <div className="empty-state">
          <p>No scientific studies added yet.</p>
        </div>
      ) : (
        <div className="items-list">
          {herb.scientificStudies.map((study) => (
            <div key={study.id} className="item-card">
              <div className="item-content">
                <h4>{study.title}</h4>
                <p className="item-details">
                  {study.authors && <span>Authors: {study.authors}</span>}
                  {study.journal && <span>Journal: {study.journal}</span>}
                  {study.publicationYear && <span>Year: {study.publicationYear}</span>}
                  <span className={`badge badge-${study.evidenceStrength.toLowerCase()}`}>
                    {study.evidenceStrength}
                  </span>
                </p>
                {study.findings && (
                  <p className="item-findings">{study.findings.substring(0, 100)}...</p>
                )}
              </div>
              <div className="item-actions">
                <button
                  className="btn-action btn-edit"
                  onClick={() => {
                    setEditingScientificStudy(study);
                    setShowScientificStudyForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn-action btn-delete"
                  onClick={() => handleDeleteScientificStudy(study.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="herb-form-overlay">
      <div className="herb-form-modal expanded">
        <div className="herb-form-header">
          <h2>{herb ? 'Edit Herb' : 'Add New Herb'}</h2>
          <button 
            onClick={onCancel} 
            className="close-button"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        <div className="form-tabs">
          <button
            className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Information
          </button>
          <button
            className={`tab-button ${activeTab === 'medicinal' ? 'active' : ''}`}
            onClick={() => setActiveTab('medicinal')}
            disabled={!herb?.id && !herb}
          >
            Medicinal Uses
          </button>
          <button
            className={`tab-button ${activeTab === 'studies' ? 'active' : ''}`}
            onClick={() => setActiveTab('studies')}
            disabled={!herb?.id && !herb}
          >
            Scientific Studies
          </button>
        </div>

        <form onSubmit={handleSubmit} className="herb-form">
          {activeTab === 'basic' && renderBasicInfoTab()}
          {activeTab === 'medicinal' && renderMedicinalUsesTab()}
          {activeTab === 'studies' && renderScientificStudiesTab()}

          {activeTab === 'basic' && (
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
                {loading ? 'Saving...' : (herb ? 'Update Herb' : 'Create Herb')}
              </button>
            </div>
          )}
        </form>

        {showMedicinalUseForm && (
          <MedicinalUseForm
            medicinalUse={editingMedicinalUse}
            herbId={herb?.id}
            onSubmit={handleMedicinalUseSubmit}
            onCancel={() => {
              setShowMedicinalUseForm(false);
              setEditingMedicinalUse(null);
            }}
            loading={formLoading}
          />
        )}

        {showScientificStudyForm && (
          <ScientificStudyForm
            scientificStudy={editingScientificStudy}
            herbId={herb?.id}
            onSubmit={handleScientificStudySubmit}
            onCancel={() => {
              setShowScientificStudyForm(false);
              setEditingScientificStudy(null);
            }}
            loading={formLoading}
          />
        )}
      </div>
    </div>
  );
};

export default HerbForm;