
import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const usePackageData = () => {
  const [packageData, setPackageData] = useState([]);
  const [airaloData, setAirlaoData] = useState([]);
  const [holaflyData, setHolaflyData] = useState([]);
  const [nomadData, setNomadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await apiClient.get('/esim_providers/admin-packages');
        setPackageData(response.data || []);
        setAirlaoData(response.data.airalo || []);
        setHolaflyData(response.data.holafly || []);
        setNomadData(response.data.nomad || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch package data');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, []);

  return { packageData, airaloData, holaflyData, nomadData, loading, error };
};

export default usePackageData;