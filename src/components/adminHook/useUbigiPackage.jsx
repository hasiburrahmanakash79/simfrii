import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";
import ubigiLogo from "../../assets/logo/ubigi-logo.png"; // Assuming you have a Ubigi logo asset; add the import/path as needed
import useFetchRegions from "./useFetchRegions";

const useUbigiPackage = (countryCode, regionName) => {
  const [ubigiData, setUbigiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { regions } = useFetchRegions();

  const region = regions.find((c) => c.slug === regionName);
  const findRegionName = region?.slug;

  useEffect(() => {
    if (!countryCode && !findRegionName) return;

    const fetchPackages = async () => {
      try {
        let queryParams = "page=1&limit=100";
        if (countryCode) {
          queryParams = `country-packages?country=${countryCode}&${queryParams}`;
        }
        if (findRegionName) {
          queryParams = `region-packages?region=${findRegionName}&${queryParams}`;
        }
        // /esim_providers/ubigi/region-packages?region=middle-east-and-north-africa
        const response = await apiClient.get(
          `/esim_providers/ubigi/${queryParams}`
        );
        const data = response.data;
        console.log(data);

        // Flatten and normalize packages
        const normalizedPackages = [];

        // Assuming data is an array of Ubigi product objects; if it's an object, adjust accordingly (e.g., data.ubigi)
        // Here, treating data as an array for multiple packages, but your example shows a single object—wrap in array if needed
        (Array.isArray(data) ? data : [data]).forEach((pkg) => {
          // Calculate data amount from allowances (e.g., convert KB to GB/MB)
          let dataAmount = "Unlimited";
          let fairUsagePolicy = null;
          if (pkg.productDefinition?.allowances?.data) {
            const fupAllowance = pkg.productDefinition.allowances.data.find(
              (a) => a.resourceName === "DATA_BUNDLE_FUP"
            );
            if (fupAllowance) {
              const kb = fupAllowance.resourceValue;
              const gb = kb / (1024 * 1024); // Convert KB to GB
              fairUsagePolicy = `${gb} GB`;
              dataAmount = `Unlimited (${gb} GB high-speed)`;
            }
          }

          // Get price (assuming first subscriptionFee in CENTS, convert to EUR)
          let originalPrice = null;
          if (
            pkg.prices?.subscriptionFee?.[0]?.[0]?.amount &&
            pkg.prices.subscriptionFee[0][0].currency === "EUR" &&
            pkg.prices.subscriptionFee[0][0].unit === "CENTS"
          ) {
            originalPrice = (pkg.prices.subscriptionFee[0][0].amount / 100).toFixed(2);
          }

          normalizedPackages.push({
            id: pkg.id || pkg.productDefinition?.productId,
            logo: ubigiLogo, // Use the imported Ubigi logo
            short_info: pkg.productDefinition?.description?.productShortText || "Ubigi",
            info: pkg.productDefinition?.description?.productShortText || "", // Or expand with more details if available
            image: null,
            sim_type: "eSIM",
            countries: pkg.productDefinition?.countryList || [],
            provider: "ubigi",
            company: "Ubigi", // Or derive from productId if needed, e.g., pkg.productDefinition.productId.split('_')[0]
            coverage: pkg.productDefinition?.countryList?.length || 0,
            duration: pkg.productDefinition?.validityPeriod
              ? `${pkg.productDefinition.validityPeriod.validityDuration} ${pkg.productDefinition.validityPeriod.validityDurationUnit}`
              : "",
            data: dataAmount,
            originalPrice,
            voice: null, // Not provided
            text: null, // Not provided
            isUnlimited: pkg.productDefinition?.unlimited || false,
            fairUsagePolicy,
          });
        });

        // If you had Nomad logic, you could add it here similarly and push to the same array

        setUbigiData(normalizedPackages);
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

  return { ubigiData, loading, error };
};

export default useUbigiPackage;