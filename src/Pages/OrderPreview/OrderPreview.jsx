import RewardOffer from "../HomePage/RewardOffer/RewardOffer";

import eSime from "../../assets/icons/eSim.svg";
import { Calendar, Globe, Layers, Smartphone, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const OrderPreview = () => {
  return (
    <div className="h-screen my-24 container mx-auto p-4">
      <RewardOffer />

      <div className="">
        <h1 className="text-3xl font-semibold text-center my-10">
          Order preview
        </h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center ">
              <h1 className="text-xl font-semibold">Supported Countries</h1>
              <button>See All</button>
            </div>
          </div>
          <div className=" ">
            <div className={`rounded-2xl border border-gray-200 p-6 shadow-sm`}>
              <div className="flex justify-center items-center">
                <img src={eSime} alt="" className="w-16 h-16" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 py-5">
                Details
              </h2>

              {/* Plan details */}
              <div className="space-y-6">
                {/* Coverage */}
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <Globe
                      className="w-5 h-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-600 text-lg">Coverage</span>
                  </div>
                  <span className="text-gray-900 text-lg font-semibold">
                    33 Country
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <Calendar
                      className="w-5 h-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-600 text-lg">Duration</span>
                  </div>
                  <span className="text-gray-900 text-lg font-semibold">
                    365 day
                  </span>
                </div>

                {/* Data */}
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <Smartphone
                      className="w-5 h-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-600 text-lg">Data</span>
                  </div>
                  <span className="text-gray-900 text-lg font-semibold">
                    500GB
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-3">
                    <Layers
                      className="w-5 h-5 text-gray-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-gray-600 text-lg">Price</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-lg">USD </span>
                    <span className="text-gray-400 line-through text-lg">
                      20
                    </span>
                    <span className="text-gray-900 text-lg font-semibold ml-1">
                      $15
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 py-5">
                <input type="checkbox" className="mt-1" />
                <p className="text-sm">
                  eSIM plans can only be used on compatible, unblocked devices.
                  Click here to{" "}
                  <Link className="text-orange-400 underline">view</Link>{" "}
                  support devices.
                </p>
              </div>
              <div className="pb-5">
                <div className="flex gap-5 font-medium">
                  <Ticket />
                  <h1>Apply a voucher</h1>
                </div>
                <input
                  type="text"
                  placeholder="Enter voucher"
                  className="mt-5 px-4 py-2 border border-gray-300 rounded-full w-full outline-none "
                />
              </div>
            <div className="flex space-x-4">
          <button
            className="flex-1 px-4 py-2 border border-gray-800 rounded-full text-gray-800 hover:bg-gray-50 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            
            className="flex-1 px-4 py-2 bg-black text-white rounded-full"
          >
            Payment
          </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPreview;
