import { Globe, Calendar, Smartphone, Layers } from "lucide-react";

const OfferCardOther = ({
  company,
  coverage,
  duration,
  data,
  originalPrice,
  bgColor,
  button,
  saleBadge,
  onBuy,
  logo,
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 p-6 shadow-sm ${bgColor}`}
    >
      {/* Header with logo and sale badge */}
      <div className="flex items-center justify-between ">
        <div >
          <img src={logo} alt="" className=" h-5 " />
        </div>
        <div className={`${saleBadge}`}>ON SALE</div>
      </div>
      <div className="py-5">
        <h2 className="md:text-lg text-md font-semibold text-gray-900">
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
            <span className="text-xs sm:text-sm text-gray-900 font-semibold">
              {originalPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Buy now button */}
      <button onClick={onBuy} className={`${button}`}>
        Buy now
      </button>
    </div>
  );
};

export default OfferCardOther;