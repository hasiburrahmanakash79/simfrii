
import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const useStaffUserList = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await apiClient.get('/dashboard/staff-user-list');
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

export default useStaffUserList;