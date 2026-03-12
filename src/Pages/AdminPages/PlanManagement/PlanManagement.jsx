import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { useAiraloPackage } from "../../../components/adminHook/useAiraloPackage";
import AdminOfferCard from "../../../components/AdminOfferCard";
import useNomadPackage from "../../../components/adminHook/useNomadPackage";
import apiClient from "../../../lib/api-client";
import Swal from "sweetalert2";
import OfferCardSkeleton from "../../../components/OfferCardSkeleton";
import useUbigiPackage from "../../../components/adminHook/useUbigiPackage";

const PlanManagement = () => {
  const {
    airaloPackages,
    loading,
    refetch: refetchAiralo,
  } = useAiraloPackage();
  const {
    nomadData,
    loading: loadingNomad,
    refetch: refetchNomad,
  } = useNomadPackage();
  const { ubigiData, loading: loadingUbigi, refetch: refetchUbigi} = useUbigiPackage();
  console.log(ubigiData);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 6;

  const TotalPlane = airaloPackages.length + nomadData.length + ubigiData.length;

  const TotalPublishPlan =
    (airaloPackages?.filter((item) => item.publish).length || 0) +
    (nomadData?.filter((item) => item.publish).length || 0) +
    (ubigiData?.filter((item) => item.publish).length || 0);

  const TotalUnpublishPlan =
    (airaloPackages?.filter((item) => !item.publish).length || 0) +
    (nomadData?.filter((item) => !item.publish).length || 0) +
    (ubigiData?.filter((item) => !item.publish).length || 0);

  const formattedTotal = TotalPlane.toLocaleString();
  const formattedPublishPlan = TotalPublishPlan.toLocaleString();
  const formattedUnpublishPlan = TotalUnpublishPlan.toLocaleString();

  const stats = [
    {
      title: "Total Plans",
      value: formattedTotal,
    },
    {
      title: "Active Plans",
      value: formattedPublishPlan,
    },
    {
      title: "Inactive Plans",
      value: formattedUnpublishPlan,
    },
  ];

  const filterOffers = (offers) =>
    offers.filter(
      (offer) =>
        !searchQuery ||
        Object.values(offer).some((val) =>
          String(val).toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

  const filteredAiraloPackages = filterOffers(airaloPackages);
  const filteredNomadPackages = filterOffers(nomadData);
  const filteredUbigiPackages = filterOffers(ubigiData);

  const [currentPageAiralo, setCurrentPageAiralo] = useState(1);
  const totalPagesAiralo = Math.ceil(
    filteredAiraloPackages.length / itemsPerPage,
  );
  const startIndexAiralo = (currentPageAiralo - 1) * itemsPerPage;
  const currentAiraloPackages = filteredAiraloPackages.slice(
    startIndexAiralo,
    startIndexAiralo + itemsPerPage,
  );

  const [currentPageNomad, setCurrentPageNomad] = useState(1);
  const totalPagesNomad = Math.ceil(
    filteredNomadPackages.length / itemsPerPage,
  );
  const startIndexNomad = (currentPageNomad - 1) * itemsPerPage;
  const currentNomadPackages = filteredNomadPackages.slice(
    startIndexNomad,
    startIndexNomad + itemsPerPage,
  );

  const [currentPageUbigi, setCurrentPageUbigi] = useState(1);
  const totalPagesUbigi = Math.ceil(
    filteredUbigiPackages.length / itemsPerPage,
  );
  const startIndexUbigi = (currentPageUbigi - 1) * itemsPerPage;
  const currentUbigiPackages = filteredUbigiPackages.slice(
    startIndexUbigi,
    startIndexUbigi + itemsPerPage,
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [actionType, setActionType] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPageAiralo(1);
    setCurrentPageNomad(1);
    setCurrentPageUbigi(1);
  };

  const handleHide = (offer) => {
    setSelectedOffer(offer);
    setActionType("hide");
    setShowModal(true);
  };

  const handlePublish = (offer) => {
    setSelectedOffer(offer);
    setActionType("publish");
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (!selectedOffer) return;
    const publishValue = actionType === "publish" ? true : false;
    try {
      await apiClient.post("/esim_providers/admin-packages-publish", {
        provider: selectedOffer.provider,
        package_id: selectedOffer.id,
        publish: publishValue,
      });
      if (selectedOffer.provider === "airalo") {
        refetchAiralo();
      } else if (selectedOffer.provider === "nomad") {
        refetchNomad();
      } else if (selectedOffer.provider === "ubigi") {
        refetchUbigi();
      }
      Swal.fire({
              toast: true,
              position: "top-end",
              icon: "success",
              title: "Status updated successfully",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            })
      
      setShowModal(false);
      setSelectedOffer(null);
      setActionType(null);
    } catch (err) {
      console.error("Error updating publish status:", err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to update status",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const renderPaginationButtons = (
    currentPage,
    totalPages,
    handlePageChange,
  ) => {
    const buttons = [];
    const maxVisiblePages = 10;
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++)
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-medium rounded-md transition-colors ${
              currentPage === i
                ? "bg-gradient-to-b from-[#FFA943] to-[#E97400] text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {i}
          </button>,
        );
    } else {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-medium rounded-md transition-colors ${
            currentPage === 1
              ? "bg-gradient-to-b from-[#FFA943] to-[#E97400] text-white"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }`}
        >
          1
        </button>,
      );
      if (currentPage > 7)
        buttons.push(
          <span
            key="ellipsis1"
            className="text-gray-500 text-xs sm:text-sm mx-1"
          >
            ...
          </span>,
        );
      for (let i = start; i <= end; i++)
        if (i !== 1 && i !== totalPages)
          buttons.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-medium rounded-md transition-colors ${
                currentPage === i
                  ? "bg-gradient-to-b from-[#FFA943] to-[#E97400] text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {i}
            </button>,
          );
      if (currentPage < totalPages - 7)
        buttons.push(
          <span
            key="ellipsis2"
            className="text-gray-500 text-xs sm:text-sm mx-1"
          >
            ...
          </span>,
        );
      if (totalPages > 1)
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm font-medium rounded-md transition-colors ${
              currentPage === totalPages
                ? "bg-gradient-to-b from-[#FFA943] to-[#E97400] text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {totalPages}
          </button>,
        );
    }
    return buttons;
  };

  return (
    <div className="">
      <SectionTitle
        title={"eSIMs Plan Management"}
        description={"Track, manage and forecast your customers and orders."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-200"
          >
            <h3 className="text-xs sm:text-sm font-medium text-gray-600">
              {stat.title}
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-5 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
                Plan Cards
              </h1>
            </div>
            <input
              type="text"
              placeholder="Search plans..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full sm:w-64 md:w-80 px-3 sm:px-4 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="p-5 space-y-7">
          {/* Airalo Plans */}
          {(loading || filteredAiraloPackages.length > 0) && (
            <div>
              <h1 className="text-2xl font-medium">Airalo Plans</h1>
              <p className="text-xs sm:text-sm text-gray-600">{`Showing ${currentAiraloPackages.length} of ${filteredAiraloPackages.length} plans`}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7 mt-4">
                {loading ? (
                  <OfferCardSkeleton count={itemsPerPage} />
                ) : (
                  currentAiraloPackages.map((offer) => (
                    <AdminOfferCard
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
                      onHide={offer.publish ? () => handleHide(offer) : null}
                      onPublish={
                        !offer.publish ? () => handlePublish(offer) : null
                      }
                    />
                  ))
                )}
              </div>
              {totalPagesAiralo > 1 && (
                <div className="py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-4">
                  <button
                    onClick={() =>
                      setCurrentPageAiralo((prev) =>
                        prev > 1 ? prev - 1 : prev,
                      )
                    }
                    disabled={currentPageAiralo === 1}
                    className={`flex items-center px-3    py-2 border text-xs sm:text-sm rounded-lg transition-colors ${
                      currentPageAiralo === 1
                        ? "text-orange-200 cursor-not-allowed"
                        : "text-orange-500 hover:bg-orange-100"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Previous
                  </button>
                  <div className="flex space-x-1 sm:space-x-2">
                    {renderPaginationButtons(
                      currentPageAiralo,
                      totalPagesAiralo,
                      setCurrentPageAiralo,
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPageAiralo((prev) =>
                        prev < totalPagesAiralo ? prev + 1 : prev,
                      )
                    }
                    disabled={currentPageAiralo === totalPagesAiralo}
                    className={`flex items-center px-3  py-2 border text-xs sm:text-sm rounded-lg transition-colors ${
                      currentPageAiralo === totalPagesAiralo
                        ? "text-orange-200 cursor-not-allowed"
                        : "text-orange-500 hover:bg-orange-100"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:mr-2" />
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Nomad Plans */}
          {(loadingNomad || filteredNomadPackages.length > 0) && (
            <div>
              <h1 className="text-2xl font-medium">Nomad Plans</h1>
              <p className="text-xs sm:text-sm text-gray-600">{`Showing ${currentNomadPackages.length} of ${filteredNomadPackages.length} plans`}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7 mt-4">
                {loadingNomad ? (
                  <OfferCardSkeleton count={itemsPerPage} />
                ) : (
                  currentNomadPackages.map((offer) => (
                    <AdminOfferCard
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
                      bgColor="bg-[#FFFFFF]"
                      button="btn-primary"
                      saleBadge="saleBadge"
                      onHide={offer.publish ? () => handleHide(offer) : null}
                      onPublish={
                        !offer.publish ? () => handlePublish(offer) : null
                      }
                    />
                  ))
                )}
              </div>
              {totalPagesNomad > 1 && (
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-4">
                  <button
                    onClick={() =>
                      setCurrentPageNomad((prev) =>
                        prev > 1 ? prev - 1 : prev,
                      )
                    }
                    disabled={currentPageNomad === 1}
                    className={`flex items-center px-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
                      currentPageNomad === 1
                        ? "text-orange-200 cursor-not-allowed"
                        : "text-orange-500 hover:bg-orange-100"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Previous
                  </button>
                  <div className="flex space-x-1 sm:space-x-2">
                    {renderPaginationButtons(
                      currentPageNomad,
                      totalPagesNomad,
                      setCurrentPageNomad,
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPageNomad((prev) =>
                        prev < totalPagesNomad ? prev + 1 : prev,
                      )
                    }
                    disabled={currentPageNomad === totalPagesNomad}
                    className={`flex items-center px-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
                      currentPageNomad === totalPagesNomad
                        ? "text-orange-200 cursor-not-allowed"
                        : "text-orange-500 hover:bg-orange-100"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:mr-2" />
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Ubigi Plans */}
          {(loadingUbigi || filteredUbigiPackages.length > 0) && (
            <div>
              <h1 className="text-2xl font-medium">Ubigi Plans</h1>
              <p className="text-xs sm:text-sm text-gray-600">{`Showing ${currentUbigiPackages.length} of ${filteredUbigiPackages.length} plans`}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-7 mt-4">
                {loadingUbigi ? (
                  <OfferCardSkeleton count={itemsPerPage} />
                ) : (
                  currentUbigiPackages.map((offer) => (
                    <AdminOfferCard
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
                      originalPrice={offer.originalPrice}
                      discountedPrice={offer.originalPrice}
                      bgColor="bg-[#FFFFFF]"
                      button="btn-primary"
                      saleBadge="saleBadge"
                      onHide={offer.publish ? () => handleHide(offer) : null}
                      onPublish={
                        !offer.publish ? () => handlePublish(offer) : null
                      }
                    />
                  ))
                )}
              </div>
              {totalPagesUbigi > 1 && (
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-4">
                  <button
                    onClick={() =>
                      setCurrentPageUbigi((prev) =>
                        prev > 1 ? prev - 1 : prev,
                      )
                    }
                    disabled={currentPageUbigi === 1}
                    className={`flex items-center px-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
                      currentPageUbigi === 1
                        ? "text-orange-200 cursor-not-allowed"
                        : "text-orange-500 hover:bg-orange-100"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                    Previous
                  </button>
                  <div className="flex space-x-1 sm:space-x-2">
                    {renderPaginationButtons(
                      currentPageUbigi,
                      totalPagesUbigi,
                      setCurrentPageUbigi,
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setCurrentPageUbigi((prev) =>
                        prev < totalPagesUbigi ? prev + 1 : prev,
                      )
                    }
                    disabled={currentPageUbigi === totalPagesUbigi}
                    className={`flex items-center px-3 py-2 text-xs sm:text-sm rounded-lg border transition-colors ${
                      currentPageUbigi === totalPagesUbigi
                        ? "text-orange-200 cursor-not-allowed"
                        : "text-orange-500 hover:bg-orange-100"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:mr-2" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-900">
              Confirm Action
            </h2>

            {/* Message */}
            <p className="mt-4 text-md text-gray-600">
              Are you sure you want to{" "}
              <span className="text-orange-500 font-bold uppercase">
                {actionType}
              </span>{" "}
              this plan?
            </p>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-b from-[#FFA943] to-[#E97400] rounded-lg hover:opacity-90 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanManagement;