import React, { useState, useEffect } from 'react';
import { X, Plus, Edit, Trash2, Save, X as CloseIcon } from 'lucide-react';
import { Herb, MedicinalUse, ScientificStudy } from '../../types/admin';
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

  // Medicinal Uses State
  const [medicinalUses, setMedicinalUses] = useState<MedicinalUse[]>([]);
  const [editingMedicinalUse, setEditingMedicinalUse] = useState<MedicinalUse | null>(null);
  const [newMedicinalUse, setNewMedicinalUse] = useState<Partial<MedicinalUse>>({
    condition: '',
    preparation: '',
    dosage: '',
    duration: '',
    evidenceLevel: 'TRADITIONAL'
  });

  // Scientific Studies State
  const [scientificStudies, setScientificStudies] = useState<ScientificStudy[]>([]);
  const [editingScientificStudy, setEditingScientificStudy] = useState<ScientificStudy | null>(null);
  const [newScientificStudy, setNewScientificStudy] = useState<Partial<ScientificStudy>>({
    title: '',
    authors: '',
    journal: '',
    publicationYear: new Date().getFullYear(),
    doi: '',
    studyType: '',
    evidenceStrength: 'MODERATE',
    findings: '',
    url: ''
  });

  const [medicinalUseLoading, setMedicinalUseLoading] = useState(false);
  const [scientificStudyLoading, setScientificStudyLoading] = useState(false);
  const [isNewHerb, setIsNewHerb] = useState(false);

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
      setMedicinalUses(herb.medicinalUses || []);
      setScientificStudies(herb.scientificStudies || []);
      setIsNewHerb(false);
    } else {
      // Reset form for new herb
      setFormData({
        name: '',
        scientificName: '',
        description: '',
        safetyLevel: 'SAFE',
        imageUrl: '',
        traditionalUses: '',
        activeCompounds: '',
        contraindications: '',
        sideEffects: '',
      });
      setMedicinalUses([]);
      setScientificStudies([]);
      setIsNewHerb(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For new herbs, include medicinal uses and scientific studies in the submission
    if (isNewHerb && (medicinalUses.length > 0 || scientificStudies.length > 0)) {
      const herbData = {
        ...formData,
        medicinalUses: medicinalUses,
        scientificStudies: scientificStudies
      };
      onSubmit(herbData);
    } else {
      // For existing herbs or new herbs without additional data
      onSubmit(formData);
    }
  };

  // Medicinal Use Handlers
  const handleMedicinalUseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (editingMedicinalUse) {
      setEditingMedicinalUse(prev => prev ? { ...prev, [name]: value } : null);
    } else {
      setNewMedicinalUse(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddMedicinalUse = async () => {
    if (!newMedicinalUse.condition) {
      alert('Please enter a condition for the medicinal use.');
      return;
    }

    if (isNewHerb) {
      // For new herb (not saved yet), add to local state
      const newUse: MedicinalUse = {
        id: Date.now(), // Temporary ID
        condition: newMedicinalUse.condition || '',
        preparation: newMedicinalUse.preparation || '',
        dosage: newMedicinalUse.dosage || '',
        duration: newMedicinalUse.duration || '',
        evidenceLevel: newMedicinalUse.evidenceLevel || 'TRADITIONAL',
        herbId: 0 // Will be set when herb is created
      };
      setMedicinalUses(prev => [...prev, newUse]);
      setNewMedicinalUse({
        condition: '',
        preparation: '',
        dosage: '',
        duration: '',
        evidenceLevel: 'TRADITIONAL'
      });
    } else if (herb?.id) {
      // For existing herb, save to database
      setMedicinalUseLoading(true);
      try {
        await onMedicinalUseCreate?.({
          ...newMedicinalUse,
          herbId: herb.id
        });
        setNewMedicinalUse({
          condition: '',
          preparation: '',
          dosage: '',
          duration: '',
          evidenceLevel: 'TRADITIONAL'
        });
      } catch (error) {
        console.error('Error adding medicinal use:', error);
        alert('Failed to add medicinal use. Please try again.');
      } finally {
        setMedicinalUseLoading(false);
      }
    }
  };

  const handleUpdateMedicinalUse = async () => {
    if (!editingMedicinalUse) return;
    
    if (isNewHerb) {
      // For new herb (not saved yet), update in local state
      setMedicinalUses(prev => 
        prev.map(use => 
          use.id === editingMedicinalUse.id ? editingMedicinalUse : use
        )
      );
      setEditingMedicinalUse(null);
    } else {
      // For existing herb, update in database
      setMedicinalUseLoading(true);
      try {
        await onMedicinalUseUpdate?.(editingMedicinalUse.id, editingMedicinalUse);
        setEditingMedicinalUse(null);
      } catch (error) {
        console.error('Error updating medicinal use:', error);
        alert('Failed to update medicinal use. Please try again.');
      } finally {
        setMedicinalUseLoading(false);
      }
    }
  };

  const handleDeleteMedicinalUse = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this medicinal use?')) {
      if (isNewHerb) {
        // For new herb (not saved yet), remove from local state
        setMedicinalUses(prev => prev.filter(use => use.id !== id));
      } else {
        // For existing herb, delete from database
        try {
          await onMedicinalUseDelete?.(id);
        } catch (error: any) {
          console.error('Error deleting medicinal use:', error);
          if (error.message && error.message.includes('403')) {
            alert('Access denied. You do not have permission to delete medicinal uses. Please contact administrator.');
          } else {
            alert('Failed to delete medicinal use. Please try again.');
          }
        }
      }
    }
  };

  // Scientific Study Handlers
  const handleScientificStudyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (editingScientificStudy) {
      setEditingScientificStudy(prev => prev ? { 
        ...prev, 
        [name]: name === 'publicationYear' ? parseInt(value) || new Date().getFullYear() : value 
      } : null);
    } else {
      setNewScientificStudy(prev => ({ 
        ...prev, 
        [name]: name === 'publicationYear' ? parseInt(value) || new Date().getFullYear() : value 
      }));
    }
  };

  const handleAddScientificStudy = async () => {
    if (!newScientificStudy.title) {
      alert('Please enter a title for the scientific study.');
      return;
    }

    if (isNewHerb) {
      // For new herb (not saved yet), add to local state
      const newStudy: ScientificStudy = {
        id: Date.now(), // Temporary ID
        title: newScientificStudy.title || '',
        authors: newScientificStudy.authors || '',
        journal: newScientificStudy.journal || '',
        publicationYear: newScientificStudy.publicationYear || new Date().getFullYear(),
        doi: newScientificStudy.doi || '',
        studyType: newScientificStudy.studyType || '',
        evidenceStrength: newScientificStudy.evidenceStrength || 'MODERATE',
        findings: newScientificStudy.findings || '',
        url: newScientificStudy.url || '',
        herbId: 0 // Will be set when herb is created
      };
      setScientificStudies(prev => [...prev, newStudy]);
      setNewScientificStudy({
        title: '',
        authors: '',
        journal: '',
        publicationYear: new Date().getFullYear(),
        doi: '',
        studyType: '',
        evidenceStrength: 'MODERATE',
        findings: '',
        url: ''
      });
    } else if (herb?.id) {
      // For existing herb, save to database
      setScientificStudyLoading(true);
      try {
        await onScientificStudyCreate?.({
          ...newScientificStudy,
          herbId: herb.id
        });
        setNewScientificStudy({
          title: '',
          authors: '',
          journal: '',
          publicationYear: new Date().getFullYear(),
          doi: '',
          studyType: '',
          evidenceStrength: 'MODERATE',
          findings: '',
          url: ''
        });
      } catch (error) {
        console.error('Error adding scientific study:', error);
        alert('Failed to add scientific study. Please try again.');
      } finally {
        setScientificStudyLoading(false);
      }
    }
  };

  const handleUpdateScientificStudy = async () => {
    if (!editingScientificStudy) return;
    
    if (isNewHerb) {
      // For new herb (not saved yet), update in local state
      setScientificStudies(prev => 
        prev.map(study => 
          study.id === editingScientificStudy.id ? editingScientificStudy : study
        )
      );
      setEditingScientificStudy(null);
    } else {
      // For existing herb, update in database
      setScientificStudyLoading(true);
      try {
        await onScientificStudyUpdate?.(editingScientificStudy.id, editingScientificStudy);
        setEditingScientificStudy(null);
      } catch (error) {
        console.error('Error updating scientific study:', error);
        alert('Failed to update scientific study. Please try again.');
      } finally {
        setScientificStudyLoading(false);
      }
    }
  };

  const handleDeleteScientificStudy = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this scientific study?')) {
      if (isNewHerb) {
        // For new herb (not saved yet), remove from local state
        setScientificStudies(prev => prev.filter(study => study.id !== id));
      } else {
        // For existing herb, delete from database
        try {
          await onScientificStudyDelete?.(id);
        } catch (error: any) {
          console.error('Error deleting scientific study:', error);
          if (error.message && error.message.includes('403')) {
            alert('Access denied. You do not have permission to delete scientific studies. Please contact administrator.');
          } else {
            alert('Failed to delete scientific study. Please try again.');
          }
        }
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
        {isNewHerb && (
          <div className="new-herb-notice">
            <span className="badge badge-info">New Herb</span>
            <span>Medicinal uses will be saved when you create the herb</span>
          </div>
        )}
      </div>

      {/* Add New Medicinal Use Form */}
      <div className="add-item-form">
        <h4>Add New Medicinal Use</h4>
        <div className="form-grid compact">
          <div className="form-group full-width">
            <label className="form-label">Condition *</label>
            <input
              type="text"
              name="condition"
              value={newMedicinalUse.condition || ''}
              onChange={handleMedicinalUseChange}
              className="form-input"
              placeholder="Enter medical condition"
              disabled={medicinalUseLoading}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Preparation</label>
            <textarea
              name="preparation"
              value={newMedicinalUse.preparation || ''}
              onChange={handleMedicinalUseChange}
              rows={2}
              className="form-textarea"
              placeholder="Enter preparation method"
              disabled={medicinalUseLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dosage</label>
            <input
              type="text"
              name="dosage"
              value={newMedicinalUse.dosage || ''}
              onChange={handleMedicinalUseChange}
              className="form-input"
              placeholder="Enter dosage"
              disabled={medicinalUseLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Duration</label>
            <input
              type="text"
              name="duration"
              value={newMedicinalUse.duration || ''}
              onChange={handleMedicinalUseChange}
              className="form-input"
              placeholder="Enter duration"
              disabled={medicinalUseLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Evidence Level</label>
            <select
              name="evidenceLevel"
              value={newMedicinalUse.evidenceLevel || 'TRADITIONAL'}
              onChange={handleMedicinalUseChange}
              className="form-select"
              disabled={medicinalUseLoading}
            >
              <option value="TRADITIONAL">Traditional</option>
              <option value="ANECDOTAL">Anecdotal</option>
              <option value="SCIENTIFIC">Scientific</option>
            </select>
          </div>

          <div className="form-group full-width">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleAddMedicinalUse}
              disabled={!newMedicinalUse.condition || medicinalUseLoading}
            >
              {medicinalUseLoading ? 'Adding...' : 'Add Medicinal Use'}
            </button>
          </div>
        </div>
      </div>

      {/* Existing Medicinal Uses */}
      <div className="items-section">
        <h4>Existing Medicinal Uses ({medicinalUses.length})</h4>
        {medicinalUses.length === 0 ? (
          <div className="empty-state">
            <p>No medicinal uses added yet.</p>
          </div>
        ) : (
          <div className="items-list">
            {medicinalUses.map((use) => (
              <div key={use.id} className="item-card">
                {editingMedicinalUse?.id === use.id ? (
                  // Edit Mode
                  <div className="edit-form">
                    <div className="form-grid compact">
                      <div className="form-group full-width">
                        <label className="form-label">Condition *</label>
                        <input
                          type="text"
                          name="condition"
                          value={editingMedicinalUse.condition || ''}
                          onChange={handleMedicinalUseChange}
                          className="form-input"
                          placeholder="Enter medical condition"
                          disabled={medicinalUseLoading}
                        />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">Preparation</label>
                        <textarea
                          name="preparation"
                          value={editingMedicinalUse.preparation || ''}
                          onChange={handleMedicinalUseChange}
                          rows={2}
                          className="form-textarea"
                          placeholder="Enter preparation method"
                          disabled={medicinalUseLoading}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Dosage</label>
                        <input
                          type="text"
                          name="dosage"
                          value={editingMedicinalUse.dosage || ''}
                          onChange={handleMedicinalUseChange}
                          className="form-input"
                          placeholder="Enter dosage"
                          disabled={medicinalUseLoading}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={editingMedicinalUse.duration || ''}
                          onChange={handleMedicinalUseChange}
                          className="form-input"
                          placeholder="Enter duration"
                          disabled={medicinalUseLoading}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Evidence Level</label>
                        <select
                          name="evidenceLevel"
                          value={editingMedicinalUse.evidenceLevel || 'TRADITIONAL'}
                          onChange={handleMedicinalUseChange}
                          className="form-select"
                          disabled={medicinalUseLoading}
                        >
                          <option value="TRADITIONAL">Traditional</option>
                          <option value="ANECDOTAL">Anecdotal</option>
                          <option value="SCIENTIFIC">Scientific</option>
                        </select>
                      </div>

                      <div className="form-group full-width">
                        <div className="edit-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={handleUpdateMedicinalUse}
                            disabled={!editingMedicinalUse.condition || medicinalUseLoading}
                          >
                            <Save size={14} />
                            {medicinalUseLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingMedicinalUse(null)}
                            disabled={medicinalUseLoading}
                          >
                            <CloseIcon size={14} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="item-content">
                      <h4>{use.condition}</h4>
                      <p className="item-details">
                        {use.preparation && <span>Preparation: {use.preparation}</span>}
                        {use.dosage && <span>Dosage: {use.dosage}</span>}
                        {use.duration && <span>Duration: {use.duration}</span>}
                        <span className={`badge badge-${use.evidenceLevel?.toLowerCase() || 'traditional'}`}>
                          {use.evidenceLevel}
                        </span>
                      </p>
                    </div>
                    <div className="item-actions">
                      <button
                        className="btn-action btn-edit"
                        onClick={() => setEditingMedicinalUse(use)}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDeleteMedicinalUse(use.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderScientificStudiesTab = () => (
    <div className="related-items-tab">
      <div className="tab-header">
        <h3>Scientific Studies</h3>
        {isNewHerb && (
          <div className="new-herb-notice">
            <span className="badge badge-info">New Herb</span>
            <span>Scientific studies will be saved when you create the herb</span>
          </div>
        )}
      </div>

      {/* Add New Scientific Study Form */}
      <div className="add-item-form">
        <h4>Add New Scientific Study</h4>
        <div className="form-grid compact">
          <div className="form-group full-width">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={newScientificStudy.title || ''}
              onChange={handleScientificStudyChange}
              className="form-input"
              placeholder="Enter study title"
              disabled={scientificStudyLoading}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Authors</label>
            <input
              type="text"
              name="authors"
              value={newScientificStudy.authors || ''}
              onChange={handleScientificStudyChange}
              className="form-input"
              placeholder="Enter authors"
              disabled={scientificStudyLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Journal</label>
            <input
              type="text"
              name="journal"
              value={newScientificStudy.journal || ''}
              onChange={handleScientificStudyChange}
              className="form-input"
              placeholder="Enter journal name"
              disabled={scientificStudyLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Publication Year</label>
            <input
              type="number"
              name="publicationYear"
              value={newScientificStudy.publicationYear || new Date().getFullYear()}
              onChange={handleScientificStudyChange}
              className="form-input"
              placeholder="Enter publication year"
              disabled={scientificStudyLoading}
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Study Type</label>
            <input
              type="text"
              name="studyType"
              value={newScientificStudy.studyType || ''}
              onChange={handleScientificStudyChange}
              className="form-input"
              placeholder="Enter study type"
              disabled={scientificStudyLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Evidence Strength</label>
            <select
              name="evidenceStrength"
              value={newScientificStudy.evidenceStrength || 'MODERATE'}
              onChange={handleScientificStudyChange}
              className="form-select"
              disabled={scientificStudyLoading}
            >
              <option value="WEAK">Weak</option>
              <option value="MODERATE">Moderate</option>
              <option value="STRONG">Strong</option>
              <option value="VERY_STRONG">Very Strong</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label className="form-label">DOI</label>
            <input
              type="text"
              name="doi"
              value={newScientificStudy.doi || ''}
              onChange={handleScientificStudyChange}
              className="form-input"
              placeholder="Enter DOI"
              disabled={scientificStudyLoading}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">URL</label>
            <input
              type="url"
              name="url"
              value={newScientificStudy.url || ''}
              onChange={handleScientificStudyChange}
              className="form-input"
              placeholder="Enter study URL"
              disabled={scientificStudyLoading}
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label">Findings</label>
            <textarea
              name="findings"
              value={newScientificStudy.findings || ''}
              onChange={handleScientificStudyChange}
              rows={3}
              className="form-textarea"
              placeholder="Enter study findings"
              disabled={scientificStudyLoading}
            />
          </div>

          <div className="form-group full-width">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleAddScientificStudy}
              disabled={!newScientificStudy.title || scientificStudyLoading}
            >
              {scientificStudyLoading ? 'Adding...' : 'Add Scientific Study'}
            </button>
          </div>
        </div>
      </div>

      {/* Existing Scientific Studies */}
      <div className="items-section">
        <h4>Existing Scientific Studies ({scientificStudies.length})</h4>
        {scientificStudies.length === 0 ? (
          <div className="empty-state">
            <p>No scientific studies added yet.</p>
          </div>
        ) : (
          <div className="items-list">
            {scientificStudies.map((study) => (
              <div key={study.id} className="item-card">
                {editingScientificStudy?.id === study.id ? (
                  // Edit Mode
                  <div className="edit-form">
                    <div className="form-grid compact">
                      <div className="form-group full-width">
                        <label className="form-label">Title *</label>
                        <input
                          type="text"
                          name="title"
                          value={editingScientificStudy.title || ''}
                          onChange={handleScientificStudyChange}
                          className="form-input"
                          placeholder="Enter study title"
                          disabled={scientificStudyLoading}
                        />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">Authors</label>
                        <input
                          type="text"
                          name="authors"
                          value={editingScientificStudy.authors || ''}
                          onChange={handleScientificStudyChange}
                          className="form-input"
                          placeholder="Enter authors"
                          disabled={scientificStudyLoading}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Journal</label>
                        <input
                          type="text"
                          name="journal"
                          value={editingScientificStudy.journal || ''}
                          onChange={handleScientificStudyChange}
                          className="form-input"
                          placeholder="Enter journal name"
                          disabled={scientificStudyLoading}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Publication Year</label>
                        <input
                          type="number"
                          name="publicationYear"
                          value={editingScientificStudy.publicationYear || new Date().getFullYear()}
                          onChange={handleScientificStudyChange}
                          className="form-input"
                          placeholder="Enter publication year"
                          disabled={scientificStudyLoading}
                          min="1900"
                          max={new Date().getFullYear()}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Study Type</label>
                        <input
                          type="text"
                          name="studyType"
                          value={editingScientificStudy.studyType || ''}
                          onChange={handleScientificStudyChange}
                          className="form-input"
                          placeholder="Enter study type"
                          disabled={scientificStudyLoading}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Evidence Strength</label>
                        <select
                          name="evidenceStrength"
                          value={editingScientificStudy.evidenceStrength || 'MODERATE'}
                          onChange={handleScientificStudyChange}
                          className="form-select"
                          disabled={scientificStudyLoading}
                        >
                          <option value="WEAK">Weak</option>
                          <option value="MODERATE">Moderate</option>
                          <option value="STRONG">Strong</option>
                          <option value="VERY_STRONG">Very Strong</option>
                        </select>
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">DOI</label>
                        <input
                          type="text"
                          name="doi"
                          value={editingScientificStudy.doi || ''}
                          onChange={handleScientificStudyChange}
                          className="form-input"
                          placeholder="Enter DOI"
                          disabled={scientificStudyLoading}
                        />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">URL</label>
                        <input
                          type="url"
                          name="url"
                          value={editingScientificStudy.url || ''}
                          onChange={handleScientificStudyChange}
                          className="form-input"
                          placeholder="Enter study URL"
                          disabled={scientificStudyLoading}
                        />
                      </div>

                      <div className="form-group full-width">
                        <label className="form-label">Findings</label>
                        <textarea
                          name="findings"
                          value={editingScientificStudy.findings || ''}
                          onChange={handleScientificStudyChange}
                          rows={3}
                          className="form-textarea"
                          placeholder="Enter study findings"
                          disabled={scientificStudyLoading}
                        />
                      </div>

                      <div className="form-group full-width">
                        <div className="edit-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={handleUpdateScientificStudy}
                            disabled={!editingScientificStudy.title || scientificStudyLoading}
                          >
                            <Save size={14} />
                            {scientificStudyLoading ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingScientificStudy(null)}
                            disabled={scientificStudyLoading}
                          >
                            <CloseIcon size={14} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="item-content">
                      <h4>{study.title}</h4>
                      <p className="item-details">
                        {study.authors && <span>Authors: {study.authors}</span>}
                        {study.journal && <span>Journal: {study.journal}</span>}
                        {study.publicationYear && <span>Year: {study.publicationYear}</span>}
                        <span className={`badge badge-${study.evidenceStrength?.toLowerCase() || 'moderate'}`}>
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
                        onClick={() => setEditingScientificStudy(study)}
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => handleDeleteScientificStudy(study.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
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
          >
            Medicinal Uses {medicinalUses.length > 0 && `(${medicinalUses.length})`}
          </button>
          <button
            className={`tab-button ${activeTab === 'studies' ? 'active' : ''}`}
            onClick={() => setActiveTab('studies')}
          >
            Scientific Studies {scientificStudies.length > 0 && `(${scientificStudies.length})`}
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
      </div>
    </div>
  );
};

export default HerbForm;