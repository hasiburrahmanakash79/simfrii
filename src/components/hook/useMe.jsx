import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";

const useMe = () => {
  const [me, setMe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await apiClient.get(
          "/settings/personal-information/me"
        );
        setMe(response.data.data || []); // Adjust based on actual response structure, e.g., response.data or response.data.regions
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch regions");
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);

  return { me, loading, error };
};

export default useMe;
