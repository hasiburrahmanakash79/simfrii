import { useState, useEffect, useCallback } from 'react';
import apiClient from '../../lib/api-client';
import nomad from "../../assets/logo/nomad.png";

const useNomadPackage = () => {
  const [nomadData, setNomadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = useCallback(async () => {
    try {
      setLoading(true);

      const response = await apiClient.get(
        `/esim_providers/nomad/admin-packages`
      );

      const data = response.data;
      const normalizedPackages = [];

      if (data.nomad && data.nomad.length > 0) {
        data.nomad.forEach((pkg) => {
          normalizedPackages.push({
            id: pkg.id,
            logo: nomad,
            short_info: pkg.name,
            info: pkg.imsi_profile,
            image: null,
            sim_type: "eSIM",
            countries: pkg.coverage,
            provider: "nomad",
            company: pkg.name.split('_')[0],
            coverage: pkg.coverage.length,
            duration: `${pkg.duration} Days`,
            data: `${pkg.amount} ${pkg.amount_unit}`,
            originalPrice: pkg.price,
            publish: pkg.publish,
            voice: null,
            text: null,
            isUnlimited: false,
            fairUsagePolicy: null,
          });
        });
      }

      setNomadData(normalizedPackages);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch country packages"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { nomadData, loading, error, refetch: fetchPackages };
};

export default useNomadPackage;