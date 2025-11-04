import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Herb } from '../../types/admin';
import './HerbList.css';

interface HerbListProps {
  herbs: Herb[];
  onEdit: (herb: Herb) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const HerbList: React.FC<HerbListProps> = ({ 
  herbs, 
  onEdit, 
  onDelete, 
  loading = false 
}) => {
  const handleDelete = (herb: Herb) => {
    if (window.confirm(`Are you sure you want to delete "${herb.name}"?`)) {
      onDelete(herb.id);
    }
  };

  if (loading) {
    return (
      <div className="herb-list-loading">
        <div className="spinner spinner-md"></div>
        <p>Loading herbs...</p>
      </div>
    );
  }

  if (herbs.length === 0) {
    return (
      <div className="herb-list-empty">
        <div className="empty-icon">🌿</div>
        <h3>No herbs found</h3>
        <p>Get started by adding your first herb to the database.</p>
      </div>
    );
  }

  return (
    <div className="herb-list">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Scientific Name</th>
            <th>Safety Level</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {herbs.map((herb) => (
            <tr key={herb.id}>
              <td>
                <div className="herb-name-cell">
                  {herb.imageUrl && (
                    <img 
                      src={herb.imageUrl} 
                      alt={herb.name}
                      className="herb-thumbnail"
                    />
                  )}
                  <div>
                    <div className="herb-name">{herb.name}</div>
                    <div className="herb-description-preview">
                      {herb.description.substring(0, 60)}...
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {herb.scientificName || (
                  <span className="text-muted">Not specified</span>
                )}
              </td>
              <td>
                <span className={`badge badge-${herb.safetyLevel.toLowerCase()}`}>
                  {herb.safetyLevel}
                </span>
              </td>
              <td>
                {new Date(herb.createdAt).toLocaleDateString()}
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-action btn-view"
                    title="View Details"
                    onClick={() => window.open(`http://localhost:3000/herbs/${herb.id}`, '_blank')}
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="btn-action btn-edit"
                    title="Edit Herb"
                    onClick={() => onEdit(herb)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn-action btn-delete"
                    title="Delete Herb"
                    onClick={() => handleDelete(herb)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HerbList;