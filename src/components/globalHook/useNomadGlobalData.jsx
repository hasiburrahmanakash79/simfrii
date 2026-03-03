import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';
import nomad from "../../assets/logo/nomad.png";

const useNomadGlobalData = () => {
  const [nomadData, setNomadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchPackages = async () => {
      try {
       
        const response = await apiClient.get(
          `/esim_providers/nomad/global-packages`
        );
        const data = response.data;

        // Flatten and normalize packages
        const normalizedPackages = [];

        // Nomad
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
              discountedPrice: pkg.price,
              voice: null, // Not provided
              text: null, // Not provided
              isUnlimited: false, // Finite data amounts
              fairUsagePolicy: null, // Not provided
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
    };

    fetchPackages();
  }, []);

  return { nomadData, loading, error };
};


export default useNomadGlobalData;