import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";
import airalo from "../../assets/logo/airalo.png";
import nomad from "../../assets/logo/nomad.png";
import holaFly from "../../assets/logo/holafly.png";

export const useFetchGlobalPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await apiClient.get(
          "/esim_providers/global-packages?page=1&limit=20"
        );
        const data = response.data;
        // Flatten and normalize packages (similar to country packages)
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
                company: operator?.title,
                coverage: operator.coverages.length,
                duration: `${pkg.day} Days`,
                data: pkg.data,
                type: operator.plan_type,
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

        // Holafly
        if (data.holafly && data.holafly.length > 0) {
          // Assume similar structure; adjust if needed
          data.holafly.forEach((pkg) => {
            normalizedPackages.push({
              id: pkg.id,
              logo: holaFly,
              provider: "holafly",
              company: "Holafly",
              coverage: pkg.coverage.length,
              duration: `${pkg.day} Days`,
              data: pkg.data,
              originalPrice: pkg.price,
              discountedPrice: pkg.price, // Adjust if there's discount
              voice: pkg.voice,
              text: pkg.text,
              isUnlimited: pkg.is_unlimited,
              fairUsagePolicy: pkg.fair_usage_policy,
            });
          });
        }

        // Nomad
        if (data.nomad && data.nomad.length > 0) {
          data.nomad.forEach((pkg) => {
            normalizedPackages.push({
              id: pkg.id,
              logo: nomad,
              provider: "Nomad",
              company: pkg?.name,
              coverage: pkg.coverage.length,
              duration: `${pkg.duration} ${pkg.duration_unit}`,
              data: `${pkg.amount} ${pkg.amount_unit}`,
              originalPrice: pkg.price,
              discountedPrice: pkg.price,
              voice: null,
              text: null,
              isUnlimited: false,
              fairUsagePolicy: null,
            });
          });
        }

        setPackages(normalizedPackages);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch global packages"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, loading, error };
};
