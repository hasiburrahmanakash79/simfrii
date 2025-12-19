import { Link, useNavigate } from "react-router-dom";
import OfferCard from "../../../components/OfferCard";
import { useFetchGlobalPackages } from "../../../components/hook/useFetchGlobalPackages";

const GlobaleSIMs = () => {
  const navigate = useNavigate();
  const { packages, loading } = useFetchGlobalPackages();
// console.log(packages);
  const slicePackage = packages.slice(0,6)

  const handleBuy = (offer) => {
    navigate(`/order-preview/${offer.id}`, { state: { offer } });
  };
  if (loading) {
    return (
      <div className="my-10">
        Loading...
      </div>
    );
  }

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
        <Link to="/worldwide?tab=global" className="text-[#FF8911] hover:underline text-end">
          See All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {slicePackage.map((offer) => (
          <OfferCard
            key={offer.id}
            logo={offer.logo}
            company={offer.company}
            coverage={offer.coverage}
            duration={offer.duration}
            data={offer.data + (offer.isUnlimited ? ' (Unlimited)' : '') + (offer.voice ? ` - ${offer.voice} Mins` : '') + (offer.text ? ` - ${offer.text} SMS` : '')}
            originalPrice={offer.originalPrice}
            discountedPrice={offer.discountedPrice}
            bgColor="bg-[#FFF6ED]"
            button="btn-primary"
            saleBadge="saleBadge"
            onBuy={() => handleBuy(offer)}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobaleSIMs;