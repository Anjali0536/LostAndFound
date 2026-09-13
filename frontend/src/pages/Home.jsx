import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
  const [healthStatus, setHealthStatus] = useState('Checking...');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.get('/health');
        if (response.data.success) {
          setHealthStatus('Backend is connected and running!');
        }
      } catch (error) {
        setHealthStatus('Failed to connect to backend.');
      }
    };
    
    checkHealth();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to CampusFind</h1>
      <p className="text-lg text-gray-700">A safe space to reconnect.</p>
      
      <div className="mt-8 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-2">System Status</h2>
        <p className={`font-medium ${healthStatus.includes('connected') ? 'text-green-600' : 'text-red-600'}`}>
          {healthStatus}
        </p>
      </div>
    </div>
  );
};

export default Home;
