import React, { useState, useEffect } from 'react';
import { herbService } from '../../services/herbService';
import './ApiDebugger.css';

const ApiDebugger: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState<string>('');
  const [herbCount, setHerbCount] = useState<number>(0);

  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    try {
      setStatus('checking');
      setMessage('Testing API connection...');

      // Test basic connection
      const isConnected = await herbService.testConnection();
      
      if (isConnected) {
        setStatus('connected');
        setMessage('API connection successful!');
        
        // Try to get herbs count
        try {
          const herbs = await herbService.getAllHerbs();
          setHerbCount(herbs.length);
          setMessage(`API connection successful! Found ${herbs.length} herbs.`);
        } catch (herbError) {
          setMessage('API connected but failed to fetch herbs.');
          console.error('Herb fetch error:', herbError);
        }
      } else {
        setStatus('error');
        setMessage('API connection failed!');
      }
    } catch (error) {
      setStatus('error');
      setMessage(`API connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('API debug error:', error);
    }
  };

  return (
    <div className="api-debugger">
      <h3>API Connection Debugger</h3>
      <div className={`debug-status ${status}`}>
        Status: {status.toUpperCase()}
      </div>
      <div className="debug-message">{message}</div>
      {herbCount > 0 && (
        <div className="debug-herb-count">
          Herbs in database: {herbCount}
        </div>
      )}
      <button 
        className="debug-retry-btn"
        onClick={checkApiConnection}
      >
        Retry Connection Test
      </button>
    </div>
  );
};

export default ApiDebugger;