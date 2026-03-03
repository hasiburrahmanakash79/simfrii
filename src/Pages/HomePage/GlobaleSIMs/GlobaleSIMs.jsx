import { Link, useNavigate } from "react-router-dom";
import OfferCard from "../../../components/OfferCard";
import { useFetchGlobalPackages } from "../../../components/hook/useFetchGlobalPackages";
import useMayaGlobalData from "../../../components/globalHook/useMayaGlobalData";
import useNomadGlobalData from "../../../components/globalHook/useNomadGlobalData";
import useYesimGlobalData from "../../../components/globalHook/useYesimGlobalData";
import { useAiraloGlobalData } from "../../../components/globalHook/useAiraloGlobalData";
import OfferCardOther from "../../../components/OfferCardOther";

const GlobaleSIMs = () => {
  const navigate = useNavigate();
  const { airaloData, loading: airaloLoading } = useAiraloGlobalData();
  const { mayaMobileData, loading: mayaLoading } = useMayaGlobalData();
  const { nomadData, loading: nomadLoading } = useNomadGlobalData();
  const { yesimData, loading: yesimLoading } = useYesimGlobalData();

  const handleBuy = (offer) => {
    navigate(`/order-preview/${offer.id}`, { state: { offer } });
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center col-span-3 h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  const slicedAiraloPackages = airaloData.slice(0, 3);
  const slicedNomadPackages = nomadData.slice(0, 3);
  const slicedMayaMobilePackages = mayaMobileData.slice(0, 3);
  const slicedYesimPackages = yesimData.slice(0, 3);

  return (
    <div className="my-10">
      <div className="grid grid-cols-4 items-center justify-between mb-5">
        <div className="col-span-3">
          <h1 className="md:text-3xl text-xl font-medium">Global eSIMs</h1>
          <p className="text-gray-600 text-xs">
            Discover our range of global eSIMs for seamless connectivity while
            traveling.
          </p>
        </div>
        <Link
          to="/worldwide?tab=global"
          className="text-[#FF8911] hover:underline text-end"
        >
          See All
        </Link>
      </div>

      <div className="space-y-7">
        {/* Airalo Plans */}
        {(airaloLoading || slicedAiraloPackages.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
              {airaloLoading ? (
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
        )}

        {/* Nomad Plans */}
        {(nomadLoading || slicedNomadPackages.length > 0) && (
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
        )}

        {/* Maya Mobile Plans */}
        {(mayaLoading || slicedMayaMobilePackages.length > 0) && (
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
                      if (offer.url_direct)
                        window.location.href = offer.url_direct;
                    }}
                  />
                ))
              )}
            </div>
        )}

        {/* Yesim Plans */}
        {(yesimLoading || slicedYesimPackages.length > 0) && (
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
        )}
      </div>
    </div>
  );
};

export default GlobaleSIMs;
