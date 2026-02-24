import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";
import yesim from "../../assets/logo/yesim.webp"; // Assuming the Maya logo path; adjust if needed
import useFetchCountries from "./useFetchCountries";
import useFetchRegions from "./useFetchRegions";

const useYesimData = (countryCode, regionName) => {
  const [yesimData, setYesimData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { countries } = useFetchCountries();
  const { regions } = useFetchRegions();

  const country = countries.find((c) => c?.country_code === countryCode);
  const formattedName = country?.title;

  const region = regions.find((c) => c.slug === regionName);
  const findRegionName = region?.slug;

  useEffect(() => {
    if (!formattedName && !findRegionName) return;

    const fetchPackages = async () => {
      try {
        let queryParams = "";
        if (formattedName) {
          queryParams += `country=${formattedName}`;
        }
        if (findRegionName) {
          if (queryParams) queryParams += "&";
          queryParams += `region=${findRegionName}`;
        }

        const response = await apiClient.get(
          `/esim_providers/yesim/products?${queryParams}`
        );
        const data = response.data;

        // Flatten and normalize packages
        const normalizedPackages = data.map((pkg) => {
          let dataStr = "";
          let isUnlimited = false;
          let fairUsage = null;

          const capacity = pkg.capacity;
          if (capacity === "-1" || capacity === -1) {
            dataStr = "Unlimited";
            isUnlimited = true;
            if (pkg.capacityInfo) {
              fairUsage = pkg.capacityInfo; // e.g. "Possible throttling"
            }
          } else if (capacity && pkg.dataUnit?.toUpperCase() === "MB") {
            const gb = Math.floor(Number(capacity) / 1024);
            dataStr = gb > 0 ? `${gb} GB` : `${capacity} MB`;
          } else {
            dataStr = "N/A";
          }

          const durationDays = pkg.period;
          const durationStr =
            durationDays === "1" || durationDays === 1
              ? "1 Day"
              : `${durationDays} Days`;

          // Use EUR as primary price (you can add multi-currency support later)
          const price = pkg.prices?.EUR || pkg.price || "0";

          return {
            // Fields matching your Maya card / OfferCard props
            id: pkg.url || pkg.directLink || `${pkg.country_code}-${pkg.period}-${pkg.capacity}`,
            logo: yesim,
            company: "Yesim",
            coverage: pkg.coverages?.length || 1,
            duration: durationStr,
            data: dataStr,
            originalPrice: price,           // Yesim mostly shows final price
            // discountedPrice: null,       // add if Yesim ever sends discount info
            sim_type: "eSIM",
            provider: "yesim",
            country_iso2: pkg.country_code?.toUpperCase(),
            planName: pkg.planName || pkg.country,
            planType: pkg.planType || "data only",
            isUnlimited,
            fairUsagePolicy: fairUsage,
            // Extra fields you might display in "show details" modal
            url: pkg.url,
            directLink: pkg.directLink,
            currency: pkg.currency || "EUR",
            capacity_mb: capacity,
            throttling: !!pkg.capacityInfo,
            // ... add more if needed (hotspot, 5G, etc. – Yesim rarely includes them here)
          };
        });

        setYesimData(normalizedPackages);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch country packages",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [formattedName, findRegionName]);

  return { yesimData, loading, error };
};

export default useYesimData;