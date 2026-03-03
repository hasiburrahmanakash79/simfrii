import { useState, useEffect, useCallback } from 'react';
import apiClient from '../../lib/api-client';

const useAdminUser = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get('/dashboard/user-list');
      setUserList(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user list');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);

  return { userList, loading, error, refetch: fetchUserList };
};

export default useAdminUser;