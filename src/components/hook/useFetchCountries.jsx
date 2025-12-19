import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const useFetchCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await apiClient.get('/esim_providers/all-countries');
        setCountries(response.data.data || []); // Adjust based on actual response structure, e.g., response.data or response.data.countries
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading, error };
};

export default useFetchCountries;