import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const usePaymentList = (page = 1,  pageSize = 10) => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentList = async () => {
      setLoading(true);
      try {
        let url = `/dashboard/payment-list?page=${page}&page_size=${pageSize}`;
        
        const response = await apiClient.get(url);
        console.log(response);
        setPaymentData(response.data || null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch payment list');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentList();
  }, [page, pageSize]);

  return { paymentData, loading, error };
};

export default usePaymentList;