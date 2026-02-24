import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import OfferCard from "../../components/OfferCard";
import useModal from "../../components/modal/useModal";
import filter from "../../assets/icons/filter.svg";
import useFetchCountries from "../../components/hook/useFetchCountries";
import { useFetchCountryPackages } from "../../components/hook/useFetchCountryPackages";
import useNomadData from "../../components/hook/useNomadData";
import useMayaMobileData from "../../components/hook/useMayaMobileData";
import useYesimData from "../../components/hook/useYesimData";
import OfferCardOther from "../../components/OfferCardOther";

const CountryEsim = () => {
  const navigate = useNavigate();
  const { countryName, provider } = useParams();
  const { countries, loading: countriesLoading } = useFetchCountries();
  const [countryCode, setCountryCode] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [selectedDuration, setSelectedDuration] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [sortOrder, setSortOrder] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();
  const offersPerPage = 6;

  // Fetch provider-specific data
  let data = [];
  let loading = true;
  if (provider === "airalo") {
    const res = useFetchCountryPackages(countryCode);
    data = res.packages;
    loading = res.loading;
  } else if (provider === "nomad") {
    const res = useNomadData(countryCode);
    data = res.nomadData;
    loading = res.loading;
  } else if (provider === "mayamobile") {
    const res = useMayaMobileData(countryCode);
    data = res.mayaMobileData;
    loading = res.loading;
  } else if (provider === "yesim") {
    const res = useYesimData(countryCode);
    data = res.yesimData;
    loading = res.loading;
  }

  // Find country code from countries based on slug
  useEffect(() => {
    if (countries.length > 0 && countryName) {
      const matchedCountry = countries.find(
        (country) =>
          country.slug.replace(/\s+/g, "-").toLowerCase() ===
          countryName.toLowerCase()
      );
      if (matchedCountry) {
        setCountryCode(matchedCountry.country_code);
      } else {
        setNotFound(true);
      }
    }
  }, [countries, countryName]);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Normalize duration for filtering
  const normalizeDuration = (dur) => {
    return dur.toLowerCase().replace(/\s+/g, "").replace("days", "day");
  };

  // Filter and sort offers
  const filteredAndSortedOffers = data
    .filter(
      (offer) =>
        (offer.discountedPrice || offer.originalPrice) >= priceRange.min &&
        (offer.discountedPrice || offer.originalPrice) <= priceRange.max &&
        (!selectedDuration ||
          normalizeDuration(offer.duration).includes(
            normalizeDuration(selectedDuration)
          ))
    )
    .sort((a, b) => {
      const priceA = a.discountedPrice || a.originalPrice;
      const priceB = b.discountedPrice || b.originalPrice;
      if (sortOrder === "lowToHigh") {
        return priceA - priceB;
      } else if (sortOrder === "highToLow") {
        return priceB - priceA;
      }
      return 0;
    });

  // Pagination calculation
  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const currentOffers = filteredAndSortedOffers.slice(
    indexOfFirstOffer,
    indexOfLastOffer
  );
  const totalPages = Math.ceil(filteredAndSortedOffers.length / offersPerPage);

  // Format country name
  const formattedName = countryName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Format provider name
  let formattedProvider = "";
  if (provider === "airalo") formattedProvider = "Airalo";
  else if (provider === "nomad") formattedProvider = "Nomad";
  else if (provider === "mayamobile") formattedProvider = "Maya Mobile";
  else if (provider === "yesim") formattedProvider = "Yesim";

  // Helper function for pagination range
  const getPaginationRange = () => {
    const range = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
    } else {
      if (currentPage <= 3) {
        range.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return range;
  };

  // Filter modal handlers
  const handlePriceRangeChange = (e) => {
    setPriceRange({ ...priceRange, max: parseInt(e.target.value) });
  };
  const handleSort = (order) => {
    setSortOrder(order);
  };
  const handleApplyFilters = () => {
    setCurrentPage(1); // Reset to first page when applying filters
    closeModal();
  };
  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: 500 });
    setSortOrder(null);
    setSelectedDuration(null);
    setCurrentPage(1); // Reset to first page
    closeModal();
  };

  const handleBuy = (offer) => {
    navigate(`/order-preview/${offer.id}`, { state: { offer } });
  };

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center col-span-3 h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  const NoOffersMessage = () => (
    <p className="text-gray-600 col-span-3 text-center">No offers available.</p>
  );

  if (countriesLoading || loading || !countryCode) {
    return (
      <div className="my-10 container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (notFound || !formattedProvider) {
    return (
      <div className="my-10 container mx-auto px-4 py-16 text-center">
        <p className="text-2xl font-medium text-gray-600">
          {notFound ? "Country not found." : "Provider not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-medium">
          {formattedName} {formattedProvider} eSIM Plans
        </h1>
        <div
          className="border border-gray-300 hover:bg-[#FFF6ED] rounded-full flex px-4 py-2 cursor-pointer"
          onClick={openModal}
        >
          <img src={filter} alt="" />
          <span className="ml-2 text-gray-600">Filters</span>
        </div>
      </div>

      {/* Offers grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {currentOffers.length > 0 ? (
          currentOffers.map((offer, index) => {
            const key = offer.id || index;
            let CardComponent =
              provider === "airalo" || provider === "nomad"
                ? OfferCard
                : OfferCardOther;
            let companyName;
            if (provider === "airalo") companyName = offer.company;
            else if (provider === "nomad") companyName = offer.short_info;
            else if (provider === "mayamobile") companyName = offer.short_info;
            else if (provider === "yesim") companyName = offer.planName;

            let originalPrice;
            let discountedPrice;
            if (provider === "airalo") {
              originalPrice = offer.originalPrice;
              discountedPrice = offer.discountedPrice;
            } else if (
              provider === "nomad" ||
              provider === "mayamobile"
            ) {
              originalPrice = offer.discountedPrice;
            } else if (provider === "yesim") {
              originalPrice = offer.originalPrice;
            }

            return (
              <CardComponent
                key={key}
                logo={offer.logo}
                company={companyName}
                coverage={offer.coverage}
                duration={offer.duration}
                data={
                  offer.data +
                  (offer.voice ? ` - ${offer.voice} Mins` : "") +
                  (offer.text ? ` - ${offer.text} SMS` : "")
                }
                originalPrice={originalPrice}
                discountedPrice={discountedPrice}
                bgColor="bg-[#FFFFFF]"
                button="btn-primary"
                saleBadge="saleBadge"
                onBuy={() => handleBuy(offer)}
              />
            );
          })
        ) : (
          <NoOffersMessage />
        )}
      </div>

      {/* Pagination */}
      {filteredAndSortedOffers.length > 0 && (
        <div className="flex justify-center items-center gap-3 mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-lg shadow-md border border-orange-200 ${
              currentPage === 1
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Prev
          </button>

          {getPaginationRange().map((item, index) =>
            item === "..." ? (
              <span key={index} className="px-3 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => setCurrentPage(item)}
                className={`px-4 py-2 rounded-lg shadow-md border border-orange-200 transition ${
                  currentPage === item
                    ? "bg-orange-400 text-white"
                    : "bg-white hover:bg-orange-200"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-lg shadow-md border border-orange-200 ${
              currentPage === totalPages
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
            <button
              className="absolute top-5 right-5 text-gray-600 hover:text-gray-900 cursor-pointer"
              onClick={closeModal}
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <h2 className="text-xl font-medium mb-4">Filter</h2>
            <div className="space-y-4">
              <button
                className={`w-full text-left text-gray-800 p-2 rounded border border-gray-200 ${
                  sortOrder === "lowToHigh"
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleSort("lowToHigh")}
              >
                Price Low to High
              </button>
              <button
                className={`w-full text-left text-gray-800 p-2 rounded border border-gray-200 ${
                  sortOrder === "highToLow"
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleSort("highToLow")}
              >
                Price High to Low
              </button>
              <div>
                <p className="text-gray-700 mb-2">Price Range</p>
                <div className="flex items-center gap-2">
                  <span>${priceRange.min}</span>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange.max}
                    onChange={handlePriceRangeChange}
                    className="w-full accent-black"
                  />
                  <span>${priceRange.max}</span>
                </div>
              </div>
              <div>
                <p className="text-gray-700 mb-2 text-sm sm:text-base">Duration</p>
                <div className="grid grid-cols-3 gap-2">
                  {["3day", "7day", "15day", "30day", "45day", "100day", "6month", "1year"].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`p-2 rounded-full border border-gray-200 text-sm sm:text-base ${
                        selectedDuration === duration ? "bg-gray-100" : "hover:bg-gray-100"
                      }`}
                    >
                      {duration === "6month" ? "6 Months" : duration === "1year" ? "1 Year" : `${duration.replace("day", " Days")}`}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-5 mt-4">
                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-full w-full"
                  onClick={handleClearFilters}
                >
                  Clear
                </button>
                <button
                  className="bg-black text-white px-4 py-2 rounded-full w-full"
                  onClick={handleApplyFilters}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryEsim;