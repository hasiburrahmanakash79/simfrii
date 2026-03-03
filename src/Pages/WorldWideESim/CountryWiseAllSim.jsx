import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import OfferCard from "../../components/OfferCard";
import useFetchCountries from "../../components/hook/useFetchCountries";
import useNomadData from "../../components/hook/useNomadData";
import useMayaMobileData from "../../components/hook/useMayaMobileData";
import useYesimData from "../../components/hook/useYesimData";
import OfferCardOther from "../../components/OfferCardOther";
import { useAiraloData } from "../../components/hook/useAiraloData";
import useUbigiData from "../../components/hook/useUbigiData";

const CountryWiseAllSim = () => {
  const navigate = useNavigate();
  const { countryName } = useParams();
  const { countries, loading: countriesLoading } = useFetchCountries();
  const [countryCode, setCountryCode] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const { packages, loading: packagesLoading } = useAiraloData(
    countryCode,
    null,
  );
  const { nomadData, loading: nomadLoading } = useNomadData(countryCode, null);
  const { mayaMobileData, loading: mayaLoading } = useMayaMobileData(
    countryCode,
    null,
  );
  const { ubigiData, loading: ubigiLoading } = useUbigiData(
    countryCode,
    null,
  );
  console.log(ubigiData);
  const { yesimData, loading: yesimLoading } = useYesimData(countryCode, null);

  // Find country code from countries based on slug
  useEffect(() => {
    if (countries.length > 0 && countryName) {
      const matchedCountry = countries.find(
        (country) =>
          country.slug.replace(/\s+/g, "-").toLowerCase() ===
          countryName.toLowerCase(),
      );
      if (matchedCountry) {
        setCountryCode(matchedCountry.country_code);
      } else {
        setNotFound(true);
      }
    }
  }, [countries, countryName]);

  // Format country name (same as CountryEsim)
  const formattedName = countryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleBuy = (offer) => {
    navigate(`/order-preview/${offer.id}`, { state: { offer } });
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center col-span-3 h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  if (countriesLoading || !countryCode) {
    return (
      <div className="my-10 container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="my-10 container mx-auto px-4 py-16 text-center">
        <p className="text-2xl font-medium text-gray-600">Country not found.</p>
      </div>
    );
  }

  const slicedAiraloPackages = packages.slice(0, 3);
  const slicedNomadPackages = nomadData.slice(0, 3);
  const slicedMayaMobilePackages = mayaMobileData.slice(0, 3);
  const slicedYesimPackages = yesimData.slice(0, 3);
  const slicedUbigiPackages = ubigiData.slice(0, 3);

  return (
    <div className="my-10 container mx-auto px-4 py-16">
      <div className="mb-5 text-center">
        <p className="font-semibold text-3xl">{formattedName} eSIM</p>
      </div>
      <div className="space-y-7">
        {/* Airalo Plans */}
        {(packagesLoading || slicedAiraloPackages.length > 0) && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-medium">Airalo Plans</h1>
              <div>
                <Link
                  to={`/esim/${countryName}/airalo`}
                  className="text-[#E97400] hover:underline font-medium"
                >
                  See all
                </Link>
              </div>
            </div>

            {/* Offers grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
              {packagesLoading ? (
                <LoadingSpinner />
              ) : (
                slicedAiraloPackages.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    logo={offer.logo}
                    company={offer.company}
                    coverage={offer.coverage}
                    duration={offer.duration}
                    data={
                      offer.data +
                      (offer.voice ? ` - ${offer.voice} Mins` : "") +
                      (offer.text ? ` - ${offer.text} SMS` : "")
                    }
                    originalPrice={offer.originalPrice}
                    discountedPrice={offer.discountedPrice}
                    bgColor="bg-[#FFFFFF]"
                    button="btn-primary"
                    saleBadge="saleBadge"
                    onBuy={() => handleBuy(offer)}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Nomad Plans */}
        {(nomadLoading || slicedNomadPackages.length > 0) && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-medium">Nomad Plans</h1>
              <div>
                <Link
                  to={`/esim/${countryName}/nomad`}
                  className="text-[#E97400] hover:underline font-medium"
                >
                  See all
                </Link>
              </div>
            </div>

            {/* Offers grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
              {nomadLoading ? (
                <LoadingSpinner />
              ) : (
                slicedNomadPackages.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    logo={offer.logo}
                    company={offer.short_info}
                    coverage={offer.coverage}
                    duration={offer.duration}
                    data={
                      offer.data +
                      (offer.voice ? ` - ${offer.voice} Mins` : "") +
                      (offer.text ? ` - ${offer.text} SMS` : "")
                    }
                    originalPrice={offer.discountedPrice}
                    bgColor="bg-[#FFFFFF]"
                    button="btn-primary"
                    saleBadge="saleBadge"
                    onBuy={() => handleBuy(offer)}
                  />
                ))
              )}
            </div>
          </div>
        )}
        {/* ubigi Plans */}
        {(ubigiLoading || slicedUbigiPackages.length > 0) && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-medium">Nomad Plans</h1>
              <div>
                <Link
                  to={`/esim/${countryName}/ubigi`}
                  className="text-[#E97400] hover:underline font-medium"
                >
                  See all
                </Link>
              </div>
            </div>

            {/* Offers grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
              {ubigiLoading ? (
                <LoadingSpinner />
              ) : (
                slicedUbigiPackages.map((offer, index) => (
                  <OfferCard
                    key={index}
                    logo={offer.logo}
                    company={offer.short_info}
                    coverage={offer.coverage}
                    duration={offer.duration}
                    data={
                      offer.data +
                      (offer.voice ? ` - ${offer.voice} Mins` : "") +
                      (offer.text ? ` - ${offer.text} SMS` : "")
                    }
                    originalPrice={offer.discountedPrice}
                    bgColor="bg-[#FFFFFF]"
                    button="btn-primary"
                    saleBadge="saleBadge"
                    onBuy={() => handleBuy(offer)}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Maya Mobile Plans */}
        {(mayaLoading || slicedMayaMobilePackages.length > 0) && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-medium">Maya Mobile Plans</h1>
              <div>
                <Link
                  to={`/esim/${countryName}/mayamobile`}
                  className="text-[#E97400] hover:underline font-medium"
                >
                  See all
                </Link>
              </div>
            </div>

            {/* Offers grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
              {mayaLoading ? (
                <LoadingSpinner />
              ) : (
                slicedMayaMobilePackages.map((offer) => (
                  <OfferCardOther
                    key={offer.id}
                    logo={offer.logo}
                    company={offer.short_info}
                    coverage={offer.coverage}
                    duration={offer.duration}
                    data={
                      offer.data +
                      (offer.voice ? ` - ${offer.voice} Mins` : "") +
                      (offer.text ? ` - ${offer.text} SMS` : "")
                    }
                    originalPrice={offer.discountedPrice}
                    bgColor="bg-[#FFFFFF]"
                    button="btn-primary"
                    saleBadge="saleBadge"
                    onBuy={() => {
                      if (offer.url_direct) window.location.href = offer.url_direct;
                    }}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* Yesim Plans */}
        {(yesimLoading || slicedYesimPackages.length > 0) && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-2xl font-medium">Yesim Plans</h1>
              <div>
                <Link
                  to={`/esim/${countryName}/yesim`}
                  className="text-[#E97400] hover:underline font-medium"
                >
                  See all
                </Link>
              </div>
            </div>

            {/* Offers grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
              {yesimLoading ? (
                <LoadingSpinner />
              ) : (
                slicedYesimPackages.map((offer, index) => (
                  <OfferCardOther
                    key={index}
                    logo={offer.logo}
                    company={offer.planName}
                    coverage={offer.coverage}
                    duration={offer.duration}
                    data={
                      offer.data +
                      (offer.voice ? ` - ${offer.voice} Mins` : "") +
                      (offer.text ? ` - ${offer.text} SMS` : "")
                    }
                    originalPrice={offer.originalPrice}
                    bgColor="bg-[#FFFFFF]"
                    button="btn-primary"
                    saleBadge="saleBadge"
                    onBuy={() => {
                      if (offer.url) window.location.href = offer.url;
                    }}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryWiseAllSim;
