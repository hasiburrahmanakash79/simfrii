
import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const useAdminUser = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await apiClient.get('/dashboard/user-list');
        setUserList(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user list');
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  return { userList, loading, error };
};

export default useAdminUser;