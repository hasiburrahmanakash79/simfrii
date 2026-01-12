import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const useOrderList = (page = 1, pageSize = 10) => {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderList = async () => {
      setLoading(true);
      try {
        let url = `/dashboard/order-list?page=${page}&page_size=${pageSize}`;

        const response = await apiClient.get(url);
        console.log(response);
        setOrderData(response.data || null);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to fetch order list'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderList();
  }, [page, pageSize]);

  return { orderData, loading, error };
};

export default useOrderList;
