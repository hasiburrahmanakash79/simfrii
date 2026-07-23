import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";

const useContent = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get("/content/upload");
      setContent(response.data.data || response.data || null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { content, loading, error, refetch: fetchContent };
};

export default useContent;
