import { useState } from "react";
import RewardOffer from "../HomePage/RewardOffer/RewardOffer";
import {
  Calendar,
  Globe,
  Layers,
  Smartphone,
  ChevronRight,
  Phone,
  MessageCircle,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const OrderPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const offer = location.state?.offer || {};
  console.log(offer);
  const countries = offer.countries || [];

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showCardSelectionModal, setShowCardSelectionModal] = useState(false);

  const first11Countries = countries.slice(0, 9);

  const openCountryModal = () => {
    setShowCountryModal(true);
  };

  const closeCountryModal = () => {
    setShowCountryModal(false);
  };

  const openCardSelectionModal = () => {
    setShowCardSelectionModal(true);
  };

  const closeCardSelectionModal = () => {
    setShowCardSelectionModal(false);
    navigate("/payment-successful");
  };

  const cards = [
    {
      id: 1,
      type: "Visa",
      holder: "John Doe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png",
    },
    {
      id: 2,
      type: "MasterCard",
      holder: "Jane Smith",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png",
    },
    {
      id: 3,
      type: "Apple Pay",
      holder: "Alex Brown",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/2560px-Apple_Pay_logo.svg.png",
    },
    {
      id: 4,
      type: "Google Pay",
      holder: "Sarah Lee",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png",
    },
  ];

  const [selectedCard, setSelectedCard] = useState(null);

  const coverageText = `${offer.coverage || 0} Countr${
    (offer.coverage || 0) > 1 ? "ies" : "y"
  }`;

  return (
    <div className="min-h-screen my-4 sm:my-6 md:my-24 container mx-auto p-2 sm:p-4">
      <RewardOffer />

      <div className="mt-4 sm:mt-6 md:mt-10">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          Order preview
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-6">
          <div className="border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center ">
              <h1 className="text-lg sm:text-xl font-semibold">
                Supported Countries
              </h1>
              <button
                onClick={openCountryModal}
                className="text-orange-600 hover:text-orange-500 font-medium flex items-center gap-1 mt-2 sm:mt-0"
              >
                See All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 mt-2 sm:mt-4">
              {first11Countries.map((country, index) => (
                <div key={index} className="flex items-center py-1 sm:py-2">
                  <img
                    src={country.image?.url || country.flag}
                    alt={country.title || country.name}
                    className="h-8 sm:h-10 w-8 sm:w-10 rounded-full object-cover mr-2 sm:mr-3"
                  />
                  <p className="text-sm sm:text-base text-gray-700">
                    {country.title || country.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <div
              className={`rounded-2xl border border-gray-200 p-3 sm:p-6 shadow-sm`}
            >
              <div className="flex justify-center items-center">
                <img src={offer.logo} alt="" className="h-12 sm:h-16" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 py-3 sm:py-5 text-center sm:text-left">
                Details
              </h2>

              {/* Plan details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Coverage */}
                <div className="flex items-center justify-between pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Globe
                      className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-600 text-base sm:text-lg">
                      Coverage
                    </span>
                  </div>
                  <span className="text-gray-900 text-base sm:text-lg font-semibold">
                    {coverageText}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Calendar
                      className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-600 text-base sm:text-lg">
                      Duration
                    </span>
                  </div>
                  <span className="text-gray-900 text-base sm:text-lg font-semibold">
                    {offer.duration}
                  </span>
                </div>

                {/* Data */}
                <div className="flex items-center justify-between pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Smartphone
                      className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-600 text-base sm:text-lg">
                      Data
                    </span>
                  </div>
                  <span className="text-gray-900 text-base sm:text-lg font-semibold">
                    {offer.data} {offer.isUnlimited ? "(Unlimited)" : ""}
                  </span>
                </div>

                {offer.voice && (
                  <div className="flex items-center justify-between pb-1 sm:pb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Phone
                        className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400"
                        strokeWidth={1.5}
                      />
                      <span className="text-gray-600 text-base sm:text-lg">
                        Voice
                      </span>
                    </div>
                    <span className="text-gray-900 text-base sm:text-lg font-semibold">
                      {offer.voice} Min
                    </span>
                  </div>
                )}

                {offer.text && (
                  <div className="flex items-center justify-between pb-1 sm:pb-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <MessageCircle
                        className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400"
                        strokeWidth={1.5}
                      />
                      <span className="text-gray-600 text-base sm:text-lg">
                        Text
                      </span>
                    </div>
                    <span className="text-gray-900 text-base sm:text-lg font-semibold">
                      {offer.text} SMS
                    </span>
                  </div>
                )}
                {/* Price */}
                <div className="flex items-center justify-between pb-1 sm:pb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Layers
                      className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-600 text-base sm:text-lg">
                      Price
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-900 text-base sm:text-lg font-semibold ml-1">
                      ${offer.originalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Plan Image */}
              {offer.image && (
                <div className="mt-4 sm:mt-6 flex justify-center">
                  <img
                    src={offer.image}
                    alt="Plan Image"
                    className="h-24 sm:h-32 rounded-2xl shadow-2xl"
                  />
                </div>
              )}

              <div className="flex items-start gap-2 py-2 sm:py-5">
                <input type="checkbox" className="mt-1" />
                <p className="text-xs sm:text-sm">
                  eSIM plans can only be used on compatible, unblocked devices.
                  <span className="text-orange-400 underline">view</span>
                  support devices.
                </p>
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  onClick={openCardSelectionModal}
                  className="flex-1 px-2 sm:px-4 py-1 sm:py-2 bg-black text-white rounded-full text-sm sm:text-base"
                >
                  Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Modal */}
      {showCountryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-2 sm:mx-4 max-h-[80vh] flex flex-col">
            <div className="sticky top-0 z-10 bg-white flex rounded-t-2xl justify-between items-center p-2 sm:p-4 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-semibold">
                All Supported Countries
              </h2>
              <button
                onClick={closeCountryModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>
            <div className="space-y-2 px-3 sm:px-6 pb-3 sm:pb-5 overflow-y-auto">
              {countries.map((country, index) => (
                <div key={index} className="flex items-center py-1 sm:py-2">
                  <img
                    src={country.image?.url || country.flag}
                    alt={country.title || country.name}
                    className="h-6 sm:h-8 w-6 sm:w-8 rounded-full object-cover mr-2 sm:mr-3"
                  />
                  <p className="text-sm sm:text-base text-gray-700">
                    {country.title || country.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Card Selection Modal */}
      {showCardSelectionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-2 sm:mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-3 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold">
                Select Payment Method
              </h2>
              <button
                onClick={closeCardSelectionModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 sm:w-6 h-5 sm:h-6" />
              </button>
            </div>
            <div className="px-3 sm:px-6 pb-3 sm:pb-5 space-y-4">
              {cards.map((card) => (
                <label
                  key={card.id}
                  className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <img
                        src={card.logo}
                        alt=""
                        className="w-12 border p-1 border-gray-200 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm sm:text-base font-medium">
                        {card.type}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {card.holder}
                      </p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="card"
                    value={card.id}
                    checked={selectedCard === card.id}
                    onChange={() => setSelectedCard(card.id)}
                    className="w-4 h-4 text-orange-500 focus:ring-0"
                  />
                </label>
              ))}
              <button
                onClick={closeCardSelectionModal}
                className="w-full py-2 sm:py-3 bg-black text-white rounded-lg text-sm sm:text-base hover:bg-gray-800 transition-colors duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPreview;