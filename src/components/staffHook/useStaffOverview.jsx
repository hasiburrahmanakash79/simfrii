

import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const useStaffOverview = () => {
  const [overview, setOverview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await apiClient.get('/dashboard/staff-overview');
        setOverview(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch overview');
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return { overview, loading, error };
};

export default useStaffOverview;