import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";
import airalo from "../../assets/logo/airalo.png";
import useFetchRegions from "./useFetchRegions";

export const useAiraloData = (countryCode, regionName) => {
  const [packages, setPackages] = useState([]);
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
          `/esim_providers/airalo/country-packages?${queryParams}`
        );
        // const response = await apiClient.get(
        //   `/esim_providers/airalo/country-packages?country=${countryCode}&page=1&limit=500`,
        // );
        const data = response.data;

        // Flatten and normalize packages
        const normalizedPackages = [];

        // Airalo
        if (data.airalo && data.airalo.length > 0) {
          data.airalo[0].operators.forEach((operator) => {
            operator.packages.forEach((pkg) => {
              normalizedPackages.push({
                id: pkg.id,
                logo: airalo,
                manual_installation: pkg.manual_installation,
                qr_installation: pkg.qr_installation,
                short_info: pkg.short_info,
                info: operator.info,
                image: operator.image.url,
                sim_type: operator.esim_type,
                countries: operator.countries,
                provider: "airalo",
                company: pkg.title,
                coverage: operator.coverages.length,
                duration: `${pkg.day} Days`,
                data: pkg.data,
                originalPrice: pkg.prices.recommended_retail_price.USD,
                discountedPrice: pkg.prices.net_price.USD,
                voice: pkg.voice,
                text: pkg.text,
                isUnlimited: pkg.is_unlimited,
                fairUsagePolicy: pkg.fair_usage_policy,
              });
            });
          });
        }
        setPackages(normalizedPackages);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch country packages",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [countryCode, findRegionName]);

  return { packages, loading, error };
};
