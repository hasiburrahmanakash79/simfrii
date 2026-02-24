import { useState, useEffect } from 'react';
import apiClient from '../../lib/api-client';
import airalo from '../../assets/logo/airalo.png'
export const useFetchRegionPackages = (slug) => {
  console.log(slug);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!slug) return;
    const fetchPackages = async () => {
      try {
        const response = await apiClient.get(`/esim_providers/regions-packages?slug=asia`);
        const data = response.data;
        console.log(data);
        // Flatten and normalize packages
        const normalizedPackages = [];

        // Airalo
        if (data.airalo && data.airalo.length > 0) {
          data.airalo.forEach(country => {
            country.operators.forEach(operator => {
              operator.packages.forEach(pkg => {
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
                  provider: 'airalo',
                  company: operator.title,
                  coverage: operator.coverages.length,
                  duration: `${pkg.day} Days`,
                  data: pkg.is_unlimited ? 'Unlimited' : pkg.data,
                  originalPrice: pkg.prices.recommended_retail_price.USD,
                  discountedPrice: pkg.prices.net_price.USD,
                  voice: pkg.voice,
                  text: pkg.text,
                  isUnlimited: pkg.is_unlimited,
                  fairUsagePolicy: pkg.fair_usage_policy,
                });
              });
            });
          });
        }
        setPackages(normalizedPackages);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch country packages');
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
   
  }, [slug]);
  return { packages, loading, error };
};