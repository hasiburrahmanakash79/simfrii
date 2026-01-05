import { useEffect, useState } from "react";
import apiClient from "../../lib/api-client";



const useAdminAnalytics = () => {
    const [adminAnalytics, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await apiClient.get('/dashboard/admin-analytics');
        setOrderList(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch order list');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderList();
  }, []);

  return { orderList, loading, error };
};

export default useAdminAnalytics;