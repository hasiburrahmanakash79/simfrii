import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  Smartphone,
} from "lucide-react";
import eSime from "../../../assets/icons/eSim.svg";
import useStaffPlan from "../../../components/staffHook/useStaffPlan";
import { useState, useMemo } from "react";

const SimPlan = () => {
  const { planList, loading } = useStaffPlan();

  console.log(
    planList
  );
  
  const airaloPlans = planList.airalo || [];
  console.log(
    airaloPlans
  );
  
  const allPlans = useMemo(() => {
    return airaloPlans.flatMap((country) =>
      country.operators.flatMap((operator) =>
        operator.packages.map((pkg) => ({ country, operator, pkg }))
      )
    );
  }, [airaloPlans]);

  const uniqueCountries = useMemo(() => {
    return [...new Set(airaloPlans.map((c) => c.title))].sort();
  }, [airaloPlans]);

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [minData, setMinData] = useState("");
  const [maxData, setMaxData] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const getDataAmount = (pkg) => {
    if (pkg.is_unlimited || pkg.data === "Unlimited") return Infinity;
    const match = pkg.data.match(/(\d+)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const filteredPlans = useMemo(() => {
    return allPlans.filter((plan) => {
      const { country, operator, pkg } = plan;
      const lowerSearch = search.toLowerCase();
      const matchesSearch =
        operator.title.toLowerCase().includes(lowerSearch) ||
        pkg.title.toLowerCase().includes(lowerSearch) ||
        country.title.toLowerCase().includes(lowerSearch);
      const matchesCountry = !selectedCountry || country.title === selectedCountry;
      const duration = pkg.day;
      const minD = minDuration ? parseInt(minDuration, 10) : 0;
      const maxD = maxDuration ? parseInt(maxDuration, 10) : Infinity;
      const matchesDuration = duration >= minD && duration <= maxD;
      const dataAmount = getDataAmount(pkg);
      const minDataNum = minData ? parseFloat(minData) : 0;
      const maxDataNum = maxData ? parseFloat(maxData) : Infinity;
      const matchesData = dataAmount >= minDataNum && dataAmount <= maxDataNum;
      const price = pkg.price;
      const minP = minPrice ? parseFloat(minPrice) : 0;
      const maxP = maxPrice ? parseFloat(maxPrice) : Infinity;
      const matchesPrice = price >= minP && price <= maxP;
      return matchesSearch && matchesCountry && matchesDuration && matchesData && matchesPrice;
    });
  }, [
    allPlans,
    search,
    selectedCountry,
    minDuration,
    maxDuration,
    minData,
    maxData,
    minPrice,
    maxPrice,
  ]);

  const total = filteredPlans.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, total);
  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <div className="">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium mb-2">
          eSIMs Plan Management
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Track, manage, and forecast your customers and orders.
        </p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min Duration (days)"
                value={minDuration}
                onChange={(e) => setMinDuration(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max Duration (days)"
                value={maxDuration}
                onChange={(e) => setMaxDuration(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min Data (GB)"
                value={minData}
                onChange={(e) => setMinData(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max Data (GB)"
                value={maxData}
                onChange={(e) => setMaxData(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="Min Price ($)"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <span>-</span>
              <input
                type="number"
                step="0.01"
                placeholder="Max Price ($)"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedPlans.length > 0 ? (
            paginatedPlans.map((plan, index) => {
              const { country, operator, pkg } = plan;
              return (
                <div
                  key={`${country.slug}-${operator.title}-${pkg.id}-${index}`}
                  className="rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={eSime}
                        alt="eSIM icon"
                        className="w-8 h-8 sm:w-10 sm:h-10"
                      />
                      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                        {operator.title}
                      </h2>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
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
                        {operator.coverages[0]?.title || country.title}
                      </span>
                    </div>
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
                        {pkg.day} Days
                      </span>
                    </div>
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
                        {pkg.data}
                      </span>
                    </div>
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
                        <span className="text-xs sm:text-sm text-gray-500">
                          USD{" "}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          {pkg.prices?.recommended_retail_price?.amount || pkg.price}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-900 font-semibold ml-1">
                          ${pkg.net_price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-6 text-gray-500 text-xs sm:text-sm">
              No plans found matching your criteria.
            </div>
          )}
        </div>
        {total > 0 && (
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-sm text-gray-600 disabled:text-gray-300"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-sm text-gray-600">
              Showing {start}-{end} of {total}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-sm text-gray-600 disabled:text-gray-300"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimPlan;