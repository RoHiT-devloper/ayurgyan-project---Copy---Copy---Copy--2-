import React, { useState, useEffect } from 'react';
import { Plus, Search, RefreshCw } from 'lucide-react';
import HerbList from './HerbList';
import HerbForm from './HerbForm';
import { adminService } from '../../services/adminService';
import { Herb, MedicinalUse, ScientificStudy } from '../../types/admin';
import './HerbManagement.css';

const HerbManagement: React.FC = () => {
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [filteredHerbs, setFilteredHerbs] = useState<Herb[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingHerb, setEditingHerb] = useState<Herb | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadHerbs();
  }, []);

  useEffect(() => {
    const filtered = herbs.filter(herb =>
      herb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      herb.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHerbs(filtered);
  }, [herbs, searchTerm]);

  const loadHerbs = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading herbs from backend...');
      const data = await adminService.getAllHerbs();
      console.log('Herbs loaded successfully:', data.length);
      setHerbs(data);
    } catch (error) {
      console.error('Error loading herbs:', error);
      setError('Failed to load herbs. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHerb = async (herbData: Partial<Herb>) => {
    try {
      setFormLoading(true);
      setError(null);
      setSuccess(null);
      console.log('Creating herb:', herbData);
      const newHerb = await adminService.createHerb(herbData);
      await loadHerbs();
      setShowForm(false);
      setSuccess('Herb created successfully!');
      
      // If this was a new herb creation, set it for editing to allow adding medicinal uses/studies
      setEditingHerb(newHerb);
      setShowForm(true);
    } catch (error: any) {
      console.error('Error creating herb:', error);
      setError('Failed to create herb. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateHerb = async (herbData: Partial<Herb>) => {
    if (!editingHerb) return;
    
    try {
      setFormLoading(true);
      setError(null);
      setSuccess(null);
      console.log('Updating herb:', editingHerb.id, herbData);
      await adminService.updateHerb(editingHerb.id, herbData);
      await loadHerbs();
      setSuccess('Herb updated successfully!');
    } catch (error: any) {
      console.error('Error updating herb:', error);
      setError('Failed to update herb. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteHerb = async (id: number) => {
    try {
      setError(null);
      setSuccess(null);
      console.log('Deleting herb:', id);
      await adminService.deleteHerb(id);
      await loadHerbs();
      setSuccess('Herb deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting herb:', error);
      setError('Failed to delete herb. Please try again.');
    }
  };

  const handleEditHerb = (herb: Herb) => {
    setEditingHerb(herb);
    setShowForm(true);
  };

  const handleMedicinalUseCreate = async (data: Partial<MedicinalUse>) => {
    try {
      setError(null);
      setSuccess(null);
      console.log('Creating medicinal use:', data);
      await adminService.createMedicinalUse(data);
      await loadHerbs(); // Reload to get updated data
      setSuccess('Medicinal use added successfully!');
    } catch (error: any) {
      console.error('Error creating medicinal use:', error);
      setError('Failed to create medicinal use. Please try again.');
      throw error; // Re-throw to let the form handle it
    }
  };

  const handleMedicinalUseUpdate = async (id: number, data: Partial<MedicinalUse>) => {
    try {
      setError(null);
      setSuccess(null);
      console.log('Updating medicinal use:', id, data);
      await adminService.updateMedicinalUse(id, data);
      await loadHerbs();
      setSuccess('Medicinal use updated successfully!');
    } catch (error: any) {
      console.error('Error updating medicinal use:', error);
      setError('Failed to update medicinal use. Please try again.');
      throw error;
    }
  };

  const handleMedicinalUseDelete = async (id: number) => {
    try {
      setError(null);
      setSuccess(null);
      console.log('Deleting medicinal use:', id);
      await adminService.deleteMedicinalUse(id);
      await loadHerbs();
      setSuccess('Medicinal use deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting medicinal use:', error);
      setError('Failed to delete medicinal use. Please try again.');
      throw error;
    }
  };

  const handleScientificStudyCreate = async (data: Partial<ScientificStudy>) => {
    try {
      setError(null);
      setSuccess(null);
      console.log('Creating scientific study:', data);
      await adminService.createScientificStudy(data);
      await loadHerbs();
      setSuccess('Scientific study added successfully!');
    } catch (error: any) {
      console.error('Error creating scientific study:', error);
      setError('Failed to create scientific study. Please try again.');
      throw error;
    }
  };

  const handleScientificStudyUpdate = async (id: number, data: Partial<ScientificStudy>) => {
    try {
      setError(null);
      setSuccess(null);
      console.log('Updating scientific study:', id, data);
      await adminService.updateScientificStudy(id, data);
      await loadHerbs();
      setSuccess('Scientific study updated successfully!');
    } catch (error: any) {
      console.error('Error updating scientific study:', error);
      setError('Failed to update scientific study. Please try again.');
      throw error;
    }
  };

  const handleScientificStudyDelete = async (id: number) => {
    try {
      setError(null);
      setSuccess(null);
      console.log('Deleting scientific study:', id);
      await adminService.deleteScientificStudy(id);
      await loadHerbs();
      setSuccess('Scientific study deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting scientific study:', error);
      setError('Failed to delete scientific study. Please try again.');
      throw error;
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="herb-management">
      <div className="herb-management-header">
        <div>
          <h1>Herb Management</h1>
          <p>Manage all herbs in the database</p>
        </div>
        <div className="header-actions">
          <button
            className="btn btn-secondary"
            onClick={loadHerbs}
            disabled={loading}
            title="Refresh herbs"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingHerb(null);
              setShowForm(true);
              clearMessages();
            }}
          >
            <Plus size={20} />
            Add New Herb
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <strong>Error:</strong> {error}
          <button className="alert-close" onClick={() => setError(null)}>×</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <strong>Success:</strong> {success}
          <button className="alert-close" onClick={() => setSuccess(null)}>×</button>
        </div>
      )}

      <div className="search-section">
        <div className="search-input-wrapper">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search herbs by name, scientific name, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="herb-stats">
          <span>Total: {herbs.length}</span>
          <span>Showing: {filteredHerbs.length}</span>
        </div>
      </div>

      <HerbList
        herbs={filteredHerbs}
        onEdit={handleEditHerb}
        onDelete={handleDeleteHerb}
        loading={loading}
      />

      {(showForm || editingHerb) && (
        <HerbForm
          herb={editingHerb}
          onSubmit={editingHerb ? handleUpdateHerb : handleCreateHerb}
          onCancel={() => {
            setShowForm(false);
            setEditingHerb(null);
            clearMessages();
          }}
          loading={formLoading}
          onMedicinalUseCreate={handleMedicinalUseCreate}
          onMedicinalUseUpdate={handleMedicinalUseUpdate}
          onMedicinalUseDelete={handleMedicinalUseDelete}
          onScientificStudyCreate={handleScientificStudyCreate}
          onScientificStudyUpdate={handleScientificStudyUpdate}
          onScientificStudyDelete={handleScientificStudyDelete}
        />
      )}
    </div>
  );
};

export default HerbManagement;