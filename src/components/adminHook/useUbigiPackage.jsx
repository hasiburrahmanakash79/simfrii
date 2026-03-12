import { useState, useEffect, useCallback } from "react";
import apiClient from "../../lib/api-client";
import ubigiLogo from "../../assets/logo/ubigi-logo.png";

const formatData = (pkg) => {
  const allowances = pkg.productDefinition?.allowances?.data;
  if (!allowances || allowances.length === 0) return "N/A";

  if (pkg.productDefinition?.unlimited) {
    const fup = allowances.find((a) => a.resourceName === "DATA_BUNDLE_FUP");
    if (fup) {
      const gb = fup.resourceValue / (1024 * 1024);
      return `Unlimited (${gb} GB)`;
    }
    return "Unlimited";
  }

  const bundle = allowances.find((a) => a.resourceName === "DATA_BUNDLE_COUNTRY");
  if (bundle) {
    const kb = bundle.resourceValue;
    if (kb >= 1024 * 1024) {
      return `${Math.round(kb / (1024 * 1024))} GB`;
    }
    return `${Math.round(kb / 1024)} MB`;
  }
  return "N/A";
};

const formatDuration = (validity) => {
  if (!validity) return "";
  const unit = validity.validityDurationUnit;
  const val = validity.validityDuration;
  const label = unit.charAt(0).toUpperCase() + unit.slice(1);
  return `${val} ${label}`;
};

const cleanText = (text) => {
  if (!text) return "";
  return text.replace(/\(s\)/g, "s").replace(/\s+/g, " ").trim();
};

const getCurrencySymbol = (code) => {
  const symbols = { USD: "$", EUR: "€", GBP: "£", JPY: "¥", CHF: "CHF", CAD: "C$", AUD: "A$", KRW: "₩", INR: "₹", BRL: "R$", MXN: "MX$", SGD: "S$", HKD: "HK$", ILS: "₪", PLN: "zł" };
  return symbols[code] || code || "$";
};

const useUbigiData = () => {
  const [ubigiData, setUbigiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get("/esim_providers/ubigi/admin-packages");
      const raw = response.data;
      console.log(raw);
      const packages = raw?.ubigi || (Array.isArray(raw) ? raw : []);
      const normalizedPackages = packages
        .filter((pkg) => pkg.availability?.available && pkg.canSubscribe?.allowed)
        .map((pkg) => ({
          id: pkg.id || pkg.productDefinition?.productId,
          logo: ubigiLogo,
          short_info: cleanText(pkg.productDefinition?.description?.productShortText) || "Ubigi",
          info: cleanText(pkg.productDefinition?.description?.productShortText) || "",
          image: null,
          sim_type: "eSIM",
          countries: pkg.productDefinition?.countryList || [],
          provider: "ubigi",
          company: cleanText(pkg.productDefinition?.description?.productLabel) || "Ubigi",
          coverage: pkg.productDefinition?.countryList?.length || 0,
          duration: formatDuration(pkg.productDefinition?.validityPeriod),
          data: formatData(pkg),
          originalPrice: pkg.prices?.subscriptionFee?.[0]?.[0]?.amount
            ? (pkg.prices.subscriptionFee[0][0].amount / 100).toFixed(2)
            : null,
          currencySymbol: getCurrencySymbol(pkg.prices?.subscriptionFee?.[0]?.[0]?.currency),
          voice: null,
          text: null,
          publish: pkg.publish,
          isUnlimited: pkg.productDefinition?.unlimited || false,
          bestseller: pkg.productDefinition?.bestseller || false,
          networks: (pkg.productDefinition?.networks || []).flatMap(n =>
            n.operators?.map(op => ({ operator: op.name, types: op.networkTypes })) || []
          ),
        }));
      setUbigiData(normalizedPackages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Ubigi packages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  return { ubigiData, loading, error, refetch: fetchPackages };
};

export default useUbigiData;