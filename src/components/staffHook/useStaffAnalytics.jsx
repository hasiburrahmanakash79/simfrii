import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";

const useStaffAnalytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await apiClient.get("/dashboard/staff-analytics");
        setAnalytics(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return { analytics, loading, error };
};

export default useStaffAnalytics;
