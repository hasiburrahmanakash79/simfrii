import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";
import airalo from "../../assets/logo/airalo.png";
import nomad from "../../assets/logo/nomad.png";
import holaFly from "../../assets/logo/holafly.png";

export const useFetchCountryPackages = (countryCode) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryCode) return;

    const fetchPackages = async () => {
      try {
        const response = await apiClient.get(
          `/esim_providers/country-packages?country=${countryCode}&page=1&limit=500`
        );
        const data = response.data;
        console.log(data);

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

        // Holafly (if any)
        if (data.holafly && data.holafly.length > 0) {
          // Assume similar structure; adjust if needed
          data.holafly.forEach((pkg) => {
            normalizedPackages.push({
              id: pkg.id,
              logo: holaFly,
              manual_installation: pkg?.manual_installation,
              qr_installation: pkg?.qr_installation,
              short_info: pkg?.short_info,
              info: pkg?.info,
              image: pkg?.image?.url,
              sim_type: pkg?.esim_type,
              countries: pkg?.countries,
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
              manual_installation: pkg?.manual_installation,
              qr_installation: pkg?.qr_installation,
              short_info: pkg?.short_info,
              info: pkg?.info,
              image: pkg?.image?.url,
              sim_type: pkg?.esim_type,
              countries: pkg?.countries,
              provider: "nomad",
              company: pkg.name,
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
          err.response?.data?.message || "Failed to fetch country packages"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [countryCode]);

  return { packages, loading, error };
};
