import React, { useState, useEffect } from 'react';
import { Leaf, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import StatsCard from './StatsCard';
import { adminService } from '../../services/adminService';
import { Herb } from '../../types/admin';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHerbs();
  }, []);

  const loadHerbs = async () => {
    try {
      const data = await adminService.getAllHerbs();
      setHerbs(data);
    } catch (error) {
      console.error('Error loading herbs:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalHerbs: herbs.length,
    safeHerbs: herbs.filter(h => h.safetyLevel === 'SAFE').length,
    cautionHerbs: herbs.filter(h => h.safetyLevel === 'CAUTION').length,
    restrictedHerbs: herbs.filter(h => h.safetyLevel === 'RESTRICTED').length,
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner spinner-lg"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to AyurGyan Admin Portal</p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Total Herbs"
          value={stats.totalHerbs}
          icon={Leaf}
          color="blue"
          description="All herbs in database"
        />
        
        <StatsCard
          title="Safe Herbs"
          value={stats.safeHerbs}
          icon={TrendingUp}
          color="green"
          description="Generally safe for use"
        />
        
        <StatsCard
          title="Caution Herbs"
          value={stats.cautionHerbs}
          icon={AlertTriangle}
          color="yellow"
          description="Require careful usage"
        />
        
        <StatsCard
          title="Restricted Herbs"
          value={stats.restrictedHerbs}
          icon={AlertTriangle}
          color="red"
          description="Professional guidance needed"
        />
      </div>

      <div className="recent-herbs">
        <h2>Recently Added Herbs</h2>
        {herbs.length === 0 ? (
          <div className="empty-state">
            <Leaf size={48} className="empty-icon" />
            <h3>No herbs found</h3>
            <p>Start by adding your first herb to the database.</p>
          </div>
        ) : (
          <div className="herbs-list">
            {herbs.slice(0, 5).map(herb => (
              <div key={herb.id} className="herb-item">
                <div className="herb-info">
                  <h4>{herb.name}</h4>
                  {herb.scientificName && (
                    <p className="scientific-name">{herb.scientificName}</p>
                  )}
                  <span className={`badge badge-${herb.safetyLevel.toLowerCase()}`}>
                    {herb.safetyLevel}
                  </span>
                </div>
                <div className="herb-date">
                  {new Date(herb.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;