import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';
import nomad from "../../assets/logo/nomad.png";
import useFetchRegions from './useFetchRegions';

const useNomadData = (countryCode, regionName) => {
  const [nomadData, setNomadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { regions} = useFetchRegions();

    const region = regions.find((c) => c.slug === regionName);
  const findRegionName = region?.slug;
  console.log(findRegionName);


  useEffect(() => {
    if (!countryCode && !findRegionName) return;

    const fetchPackages = async () => {
      try {
        let queryParams = "page=1&limit=100";
        if (countryCode) {
          queryParams = `country=${countryCode}&${queryParams}`;
        }
        if (findRegionName) {
          queryParams = `region=${findRegionName}&${queryParams}`;
        }

        const response = await apiClient.get(
          `/esim_providers/nomad/country-packages?${queryParams}`
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
              originalPrice: null, 
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
  }, [countryCode, findRegionName]);

  return { nomadData, loading, error };
};

export default useNomadData;