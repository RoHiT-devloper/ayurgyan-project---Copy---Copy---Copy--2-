import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
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
      const data = await adminService.getAllHerbs();
      setHerbs(data);
    } catch (error) {
      console.error('Error loading herbs:', error);
      alert('Failed to load herbs. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHerb = async (herbData: Partial<Herb>) => {
    try {
      setFormLoading(true);
      const newHerb = await adminService.createHerb(herbData);
      await loadHerbs();
      setShowForm(false);
      alert('Herb created successfully!');
      
      // If this was a new herb creation, set it for editing to allow adding medicinal uses/studies
      setEditingHerb(newHerb);
      setShowForm(true);
    } catch (error) {
      console.error('Error creating herb:', error);
      alert('Failed to create herb. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateHerb = async (herbData: Partial<Herb>) => {
    if (!editingHerb) return;
    
    try {
      setFormLoading(true);
      await adminService.updateHerb(editingHerb.id, herbData);
      await loadHerbs();
      alert('Herb updated successfully!');
    } catch (error) {
      console.error('Error updating herb:', error);
      alert('Failed to update herb. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteHerb = async (id: number) => {
    try {
      await adminService.deleteHerb(id);
      await loadHerbs();
      alert('Herb deleted successfully!');
    } catch (error) {
      console.error('Error deleting herb:', error);
      alert('Failed to delete herb. Please try again.');
    }
  };

  const handleEditHerb = (herb: Herb) => {
    setEditingHerb(herb);
  };

  const handleMedicinalUseCreate = async (data: Partial<MedicinalUse>) => {
    await adminService.createMedicinalUse(data);
    await loadHerbs(); // Reload to get updated data
  };

  const handleMedicinalUseUpdate = async (id: number, data: Partial<MedicinalUse>) => {
    await adminService.updateMedicinalUse(id, data);
    await loadHerbs();
  };

  const handleMedicinalUseDelete = async (id: number) => {
    await adminService.deleteMedicinalUse(id);
    await loadHerbs();
  };

  const handleScientificStudyCreate = async (data: Partial<ScientificStudy>) => {
    await adminService.createScientificStudy(data);
    await loadHerbs();
  };

  const handleScientificStudyUpdate = async (id: number, data: Partial<ScientificStudy>) => {
    await adminService.updateScientificStudy(id, data);
    await loadHerbs();
  };

  const handleScientificStudyDelete = async (id: number) => {
    await adminService.deleteScientificStudy(id);
    await loadHerbs();
  };

  return (
    <div className="herb-management">
      <div className="herb-management-header">
        <div>
          <h1>Herb Management</h1>
          <p>Manage all herbs in the database</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <Plus size={20} />
          Add New Herb
        </button>
      </div>

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