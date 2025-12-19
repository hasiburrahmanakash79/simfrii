import { useNavigate } from "react-router-dom";
import OfferCard from "../../../components/OfferCard";
import { useFetchGlobalPackages } from "../../../components/hook/useFetchGlobalPackages";

const DataCard = () => {
  const navigate = useNavigate();
  const { packages, loading } = useFetchGlobalPackages();

  const handleBuy = (offer) => {
    navigate(`/order-preview/${offer.id}`, { state: { offer } });
  };

  if (loading) {
    return <div className="my-10">Loading...</div>;
  }
return (
  <div className="my-10">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
      {packages
        .filter((offer) => offer.type !== "data-voice-text") // only data type
        .map((offer) => (
          <OfferCard
            key={offer.id}
            logo={offer.logo}
            company={offer.company}
            coverage={offer.coverage}
            duration={offer.duration}
            data={
              offer.data +
              (offer.isUnlimited ? " (Unlimited)" : "") +
              (offer.voice ? ` - ${offer.voice} Mins` : "") +
              (offer.text ? ` - ${offer.text} SMS` : "")
            }
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

export default DataCard;
