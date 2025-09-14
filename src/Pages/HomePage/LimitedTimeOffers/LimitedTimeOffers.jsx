import { Globe, Calendar, Smartphone, Layers } from 'lucide-react';

const LimitedTimeOffers = () => {
  const offers = [
    {
      company: "Airalo",
      coverage: "137 Countries",
      duration: "365 Days",
      data: "50 GB",
      originalPrice: 53,
      discountedPrice: 50.7,
    },
    {
      company: "Globetrotter",
      coverage: "120 Countries",
      duration: "180 Days",
      data: "30 GB",
      originalPrice: 45,
      discountedPrice: 42.5,
    },
    {
      company: "ConnectSphere",
      coverage: "150 Countries",
      duration: "90 Days",
      data: "20 GB",
      originalPrice: 35,
      discountedPrice: 33.0,
    },
    {
      company: "RoamFree",
      coverage: "100 Countries",
      duration: "30 Days",
      data: "10 GB",
      originalPrice: 25,
      discountedPrice: 23.5,
    },
    {
      company: "TravelNet",
      coverage: "80 Countries",
      duration: "60 Days",
      data: "15 GB",
      originalPrice: 30,
      discountedPrice: 28.0,
    },
    {
      company: "WorldLink",
      coverage: "200 Countries",
      duration: "365 Days",
      data: "100 GB",
      originalPrice: 80,
      discountedPrice: 75.0,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-medium mb-4">Limited Time Offers</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 p-6 shadow-sm"
          >
            {/* Header with logo and sale badge */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {offer.company[0].toLowerCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {offer.company}
                </h2>
              </div>
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
                ON SALE
              </div>
            </div>

            {/* Plan details */}
            <div className="space-y-6">
              {/* Coverage */}
              <div className="flex items-center justify-between border-b pb-2 border-gray-300">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                  <span className="text-gray-600 text-lg">Coverage</span>
                </div>
                <span className="text-gray-900 text-lg font-semibold">
                  {offer.coverage}
                </span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between border-b pb-2 border-gray-300">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                  <span className="text-gray-600 text-lg">Duration</span>
                </div>
                <span className="text-gray-900 text-lg font-semibold">
                  {offer.duration}
                </span>
              </div>

              {/* Data */}
              <div className="flex items-center justify-between border-b pb-2 border-gray-300">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                  <span className="text-gray-600 text-lg">Data</span>
                </div>
                <span className="text-gray-900 text-lg font-semibold">
                  {offer.data}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between border-b pb-2 border-gray-300">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                  <span className="text-gray-600 text-lg">Price</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-lg">USD </span>
                  <span className="text-gray-400 line-through text-lg">
                    {offer.originalPrice}
                  </span>
                  <span className="text-gray-900 text-lg font-semibold ml-1">
                    {offer.discountedPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Buy now button */}
            <button className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-2 px-6 rounded-full text-lg mt-8 transition-all duration-200 shadow-lg">
              Buy now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitedTimeOffers;