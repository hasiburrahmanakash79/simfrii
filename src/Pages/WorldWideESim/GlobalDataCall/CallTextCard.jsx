import eSime from "../../../assets/logo/airalo.png";
import {
  Calendar,
  Globe,
  Layers,
  MessageSquareText,
  Phone,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFetchGlobalPackages } from "../../../components/hook/useFetchGlobalPackages";

const CallTextCard = () => {
   const navigate = useNavigate();
    const { packages, loading } = useFetchGlobalPackages();
  
    console.log(packages);
      const handleBuy = (offer) => {
    navigate(`/order-preview/${offer.id}`, { state: { offer } });
  };
  
    if (loading) {
      return <div className="my-10">Loading...</div>;
    }
 

  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
      {packages
        .filter((offer) => offer.type === "data-voice-text") // only data type
        .map((offer, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-[#FFF6ED]"
        >
          {/* Header with logo and sale badge */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="">
                <img src={eSime} alt="" className="w-8 h-6 md:w-10 md:h-8" />
              </div>
              <h2 className="md:text-lg text-md font-semibold text-gray-900">
                {offer?.company}
              </h2>
            </div>
            <div className="bg-gradient-to-b from-[#FFA943] to-[#E97400] text-white px-4 md:py-1.5 py-1 rounded-full text-xs md:font-medium text-nowrap">
              ON SALE
            </div>
          </div>

          {/* Plan details */}
          <div className="space-y-3 sm:space-y-4">
            {/* Coverage */}
            <div className="flex items-center justify-between border-b pb-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Globe
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Coverage
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-900 font-semibold">
                {offer.coverage}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center justify-between border-b pb-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Calendar
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Duration
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-900 font-semibold">
                {offer.duration}
              </span>
            </div>

            {/* Data */}
            <div className="flex items-center justify-between border-b pb-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Smartphone
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Data
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-900 font-semibold">
                {offer.data}
              </span>
            </div>

            {/* Calls */}
            <div className="flex items-center justify-between border-b pb-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Phone
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Call
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-900 font-semibold">
                {offer.voice} Min
              </span>
            </div>

            {/* Texts */}
            <div className="flex items-center justify-between border-b pb-2 border-gray-200">
              <div className="flex items-center gap-2">
                <MessageSquareText
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Text
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-900 font-semibold">
                {offer.text} SMS
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between border-b pb-2 border-gray-200">
              <div className="flex items-center gap-2">
                <Layers
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  Price
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs sm:text-sm text-gray-900 font-semibold">
                  ${offer.originalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Buy now button */}
          <button
            onClick={() => handleBuy(offer)}
            className="w-full bg-gradient-to-b from-[#FFA943] to-[#E97400] hover:scale-105 text-white font-semibold py-2 px-6 rounded-full text-lg mt-7 transition-transform duration-300 shadow-lg cursor-pointer"
          >
            Buy now
          </button>
        </div>
      ))}
    </div>
  );
};

export default CallTextCard;