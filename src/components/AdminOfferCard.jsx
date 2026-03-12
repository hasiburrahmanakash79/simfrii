import { Globe, Calendar, Smartphone, Layers } from "lucide-react";
import useMe from "./hook/useMe";

const AdminOfferCard = ({
  company,
  coverage,
  duration,
  data,
  originalPrice,
  bgColor,
  onHide,
  onPublish,
  logo,
}) => {
  const { me } = useMe();
  return (
    <div
      className={`rounded-2xl border border-gray-200 p-6 shadow-sm ${bgColor}`}
    >
      {/* Header with logo and sale badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="">
            <img src={logo} alt="" className=" h-6 md:h-8 " />
          </div>
        </div>
      </div>
      <div>
        <h2 className="md:text-lg text-md font-semibold text-gray-900 py-5">
          {company}
        </h2>
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
            {coverage} Countries
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
            {duration}
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
            {data}
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
            {/* <span className="text-xs sm:text-sm text-gray-500">USD </span> */}
            <span className="text-xs sm:text-sm text-gray-900 font-semibold">
              ${originalPrice}
            </span>
            {/* <span className="text-xs sm:text-sm text-gray-900 font-semibold ml-1">${discountedPrice}</span> */}
          </div>
        </div>
      </div>

      {me?.permissions?.can_edit_plans ? (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6">
          {onHide && (
            <button
              onClick={onHide}
              className="w-full border border-orange-500 text-orange-500 bg-white hover:bg-orange-50 font-semibold py-3 px-4 rounded-full text-xs sm:text-sm transition-colors"
            >
              Hide
            </button>
          )}
          {onPublish && (
            <button
              onClick={onPublish}
              className="w-full bg-gradient-to-b from-[#FFA943] to-[#E97400] text-white font-semibold py-3 px-4 rounded-full text-xs sm:text-sm transition-colors"
            >
              Publish
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AdminOfferCard;
