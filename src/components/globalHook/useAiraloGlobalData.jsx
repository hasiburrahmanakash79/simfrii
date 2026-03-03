import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";
import airalo from "../../assets/logo/airalo.png";

export const useAiraloGlobalData = () => {
  const [airaloData, setAiraloData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {

    const fetchPackages = async () => {
      try {
        const response = await apiClient.get(
          `/esim_providers/airalo/global-packages`
        );
        const data = response.data;
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
        setAiraloData(normalizedPackages);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch country packages",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { airaloData, loading, error };
};

