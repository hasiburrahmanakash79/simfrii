import { useState, useEffect } from "react";
import apiClient from "../../lib/api-client";
import maya from "../../assets/logo/maya-mobile-logo.png";

const useMayaGlobalData = () => {
  const [mayaMobileData, setMayaMobileData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await apiClient.get(
          `esim_providers/maya/products?global=Global`,
        );
        const data = response.data;
        // Flatten and normalize packages
        const normalizedPackages = [];

        const packages = Array.isArray(data) ? data : data.maya || [];

        if (packages.length > 0) {
          packages.forEach((pkg) => {
            normalizedPackages.push({
              id: pkg.id,
              logo: maya,
              short_info: pkg.name,
              info: pkg.plan_type,
              image: null,
              sim_type: "eSIM",
              countries: pkg.countries_supported,
              provider: "maya",
              company: pkg.country_name,
              coverage: pkg.countries_supported.length,
              duration: `${pkg.duration_days} Days`,
              data: pkg.unlimited_data ? "Unlimited" : `${pkg.data_gb} GB`,
              originalPrice: pkg.on_sale
                ? (
                    parseFloat(pkg.price_usd) /
                    (1 - pkg.discount_pct / 100)
                  ).toFixed(2)
                : null,
              discountedPrice: pkg.price_usd,
              voice: pkg.service_voice ? "Included" : null, // Adjusted based on boolean; customize if mins are available
              text: pkg.service_sms ? "Included" : null, // Adjusted based on boolean
              isUnlimited: !!pkg.unlimited_data,
              fairUsagePolicy: pkg.dataCap
                ? `${pkg.dataCap} ${pkg.dataUnit} per ${pkg.dataCapPer}`
                : null,
              // Additional fields from response to "show all data" in normalized form
              country_iso2: pkg.country_iso2,
              country_iso3: pkg.country_iso3,
              dataCap: pkg.dataCap,
              dataUnit: pkg.dataUnit,
              dataCapPer: pkg.dataCapPer,
              speed_policy: pkg.speed_policy,
              rechargeable: pkg.rechargeable,
              hotspot: pkg.hotspot,
              service_data: pkg.service_data,
              network_4g: pkg.network_4g,
              network_5g: pkg.network_5g,
              url_shop: pkg.url_shop,
              url_direct: pkg.url_direct,
              regional_package: pkg.regional_package,
              // Prices in other currencies (included to show all data)
              price_eur: pkg.price_eur,
              price_gbp: pkg.price_gbp,
              price_chf: pkg.price_chf,
              price_pln: pkg.price_pln,
              price_cad: pkg.price_cad,
              price_aud: pkg.price_aud,
              price_jpy: pkg.price_jpy,
              price_hkd: pkg.price_hkd,
              price_sgd: pkg.price_sgd,
              price_krw: pkg.price_krw,
              price_ils: pkg.price_ils,
              price_brl: pkg.price_brl,
              price_mxn: pkg.price_mxn,
              price_inr: pkg.price_inr,
            });
          });
        }

        setMayaMobileData(normalizedPackages);
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

  return { mayaMobileData, loading, error };
};

export default useMayaGlobalData;
