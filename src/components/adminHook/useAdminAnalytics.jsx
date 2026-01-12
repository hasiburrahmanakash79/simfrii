import { useEffect, useState } from "react";
import apiClient from "../../lib/api-client";

const useAdminAnalytics = () => {
  const [adminAnalytics, setAdminAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminAnalytics = async () => {
      try {
        const response = await apiClient.get("/dashboard/admin-analytics");
        setAdminAnalytics(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch admin analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminAnalytics();
  }, []);

  return { adminAnalytics, loading, error };
};

export default useAdminAnalytics;
