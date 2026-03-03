import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import OfferCard from "../../../components/OfferCard";
import filter from "../../../assets/icons/filter.svg";
import useModal from "../../../components/modal/useModal";
import useYesimData from "../../../components/hook/useYesimData";
import useNomadData from "../../../components/hook/useNomadData";
import useMayaMobileData from "../../../components/hook/useMayaMobileData";
import { useAiraloData } from "../../../components/hook/useAiraloData";
import OfferCardOther from "../../../components/OfferCardOther";

const ProviderPlans = ({ provider, regionName, filters }) => {
  const { priceRange, sortOrder, selectedDuration, selectedProviders } = filters;
  const [currentPage, setCurrentPage] = useState(1);
  const offersPerPage = 6;

  let data = [];
  let loading = true;

  if (provider === "airalo") {
    const res = useAiraloData(null, regionName);
    data = res.packages;
    loading = res.loading;
  } else if (provider === "nomad") {
    const res = useNomadData(null, regionName);
    data = res.nomadData;
    loading = res.loading;
  } else if (provider === "mayamobile") {
    const res = useMayaMobileData(null, regionName);
    data = res.mayaMobileData;
    loading = res.loading;
  } else if (provider === "yesim") {
    const res = useYesimData(null, regionName);
    data = res.yesimData;
    loading = res.loading;
  }

  // Normalize duration for filtering
  const normalizeDuration = (dur) => {
    return dur.toLowerCase().replace(/\s+/g, "").replace("days", "day").replace("day", "day");
  };

  // Filter and sort offers
  const filteredAndSortedOffers = data
    .filter(
      (offer) => {
        const price = offer.discountedPrice || offer.originalPrice || 0;
        const matchesPrice = price >= priceRange.min && price <= priceRange.max;
        const matchesDuration = !selectedDuration || normalizeDuration(offer.duration).includes(normalizeDuration(selectedDuration));
        return matchesPrice && matchesDuration;
      }
    )
    .sort((a, b) => {
      const priceA = a.discountedPrice || a.originalPrice || 0;
      const priceB = b.discountedPrice || b.originalPrice || 0;
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
  const currentOffers = filteredAndSortedOffers.slice(indexOfFirstOffer, indexOfLastOffer);
  const totalPages = Math.ceil(filteredAndSortedOffers.length / offersPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset page when filters change
  }, [filters]);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const navigate = useNavigate();

  const handleBuy = (offer) => {
  if (provider === "yesim" && offer.url) {
    window.location.href = offer.url;
  } else if (provider === "mayamobile" && offer.url_direct) {
    window.location.href = offer.url_direct;
  } else {
    navigate(`/order-preview/${offer.id}`, { state: { offer } });
  }
};

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center col-span-3 h-32">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  const NoOffersMessage = () => (
    <p className="text-gray-600 col-span-3 text-center">No offers available.</p>
  );

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

  if (!selectedProviders.includes(provider)) return null;

  let CardComponent = provider === "airalo" || provider === "nomad" || provider === "mayamobile" ? OfferCard : OfferCardOther;
  let title = provider.charAt(0).toUpperCase() + provider.slice(1) + " Plans";

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>

      {/* Offers grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7">
        {loading ? (
          <LoadingSpinner />
        ) : currentOffers.length > 0 ? (
          currentOffers.map((offer, index) => {
            const key = index;
            let companyName;
            if (provider === "airalo") companyName = offer.company;
            else if (provider === "nomad") companyName = offer.short_info;
            else if (provider === "mayamobile") companyName = offer.short_info;
            else if (provider === "yesim") companyName = offer.planName;

            let originalPrice = offer.originalPrice;
            let discountedPrice = offer.discountedPrice;

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
                originalPrice={originalPrice || discountedPrice}
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
      {filteredAndSortedOffers.length > offersPerPage && (
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
                    ? "bg-orange-500 text-white"
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
    </div>
  );
};

const RegionOffers = () => {
  const navigate = useNavigate();
  const { regionName } = useParams();
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedProviders, setSelectedProviders] = useState(["airalo", "nomad", "mayamobile", "yesim"]); // Default all
  const { isOpen, openModal, closeModal } = useModal();

  const filters = { priceRange, sortOrder, selectedDuration, selectedProviders };

  // Format region name
  const formattedRegion = regionName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Filter modal handlers
  const handlePriceRangeChange = (e) => {
    setPriceRange({ ...priceRange, max: parseInt(e.target.value) });
  };
  const handleSort = (order) => {
    setSortOrder(order);
  };
  const handleProviderToggle = (provider) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    );
  };
  const handleApplyFilters = () => {
    closeModal();
  };
  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: 500 });
    setSortOrder(null);
    setSelectedDuration(null);
    setSelectedProviders(["airalo", "nomad", "mayamobile", "yesim"]);
    closeModal();
  };

  return (
    <div className="my-10 container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-medium">{formattedRegion} eSIM Plans</h1>
        <div
          className="border border-gray-300 rounded-full flex px-4 py-2 cursor-pointer"
          onClick={openModal}
        >
          <img src={filter} alt="" />
          <span className="ml-2 text-gray-600">Filters</span>
        </div>
      </div>

      <div className="space-y-10">
        <ProviderPlans provider="airalo" regionName={regionName} filters={filters} />
        <ProviderPlans provider="nomad" regionName={regionName} filters={filters} />
        <ProviderPlans provider="mayamobile" regionName={regionName} filters={filters} />
        <ProviderPlans provider="yesim" regionName={regionName} filters={filters} />
      </div>

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
              <div>
                <p className="text-gray-700 mb-2">Providers</p>
                <div className="grid grid-cols-2 gap-2">
                  {["airalo", "nomad", "mayamobile", "yesim"].map((prov) => (
                    <label key={prov} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedProviders.includes(prov)}
                        onChange={() => handleProviderToggle(prov)}
                        className="mr-2"
                      />
                      {prov.charAt(0).toUpperCase() + prov.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
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
                  {["3 Days", "7 Days", "15 Days", "30 Days", "45 Days", "100 Days", "6 Months", "1 Year"].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`p-2 rounded-full border border-gray-200 text-sm sm:text-base ${
                        selectedDuration === duration ? "bg-gray-100" : "hover:bg-gray-100"
                      }`}
                    >
                      {duration}
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

export default RegionOffers;