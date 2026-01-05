import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';

const usePaymentList = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentList = async () => {
      try {
        const response = await apiClient.get('/dashboard/payment-list');
        console.log(response);
        setPaymentData(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch payment list');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentList();
  }, []);

  return { paymentData, loading, error };
};

export default usePaymentList;