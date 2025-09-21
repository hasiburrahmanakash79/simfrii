import { useState } from "react";
import RewardOffer from "../HomePage/RewardOffer/RewardOffer";
import eSime from "../../assets/icons/eSim.svg";
import { Calendar, Globe, Layers, Smartphone, Ticket, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const OrderPreview = () => {
  const countries = [
    {
      name: "Afghanistan",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_Taliban.svg/512px-Flag_of_the_Taliban.svg.png",
    },
    {
      name: "Albania",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Flag_of_Albania.svg/512px-Flag_of_Albania.svg.png",
    },
    {
      name: "Algeria",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/512px-Flag_of_Algeria.svg.png",
    },
    {
      name: "Andorra",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/512px-Flag_of_Andorra.svg.png",
    },
    {
      name: "Angola",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Angola.svg/512px-Flag_of_Angola.svg.png",
    },
    {
      name: "Antigua and Barbuda",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Flag_of_Antigua_and_Barbuda.svg/512px-Flag_of_Antigua_and_Barbuda.svg.png",
    },
    {
      name: "Argentina",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/512px-Flag_of_Argentina.svg.png",
    },
    {
      name: "Armenia",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_Armenia.svg/512px-Flag_of_Armenia.svg.png",
    },
    {
      name: "Australia",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/512px-Flag_of_Australia.svg.png",
    },
    {
      name: "Austria",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Austria.svg/512px-Flag_of_Austria.svg.png",
    },
    {
      name: "Azerbaijan",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/512px-Flag_of_Azerbaijan.svg.png",
    },
    {
      name: "Bahamas",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_the_Bahamas.svg/512px-Flag_of_the_Bahamas.svg.png",
    },
    {
      name: "Bahrain",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/512px-Flag_of_Bahrain.svg.png",
    },
    {
      name: "Bangladesh",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/512px-Flag_of_Bangladesh.svg.png",
    },
    {
      name: "Barbados",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Flag_of_Barbados.svg/512px-Flag_of_Barbados.svg.png",
    },
    {
      name: "Belarus",
      flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_of_Belarus.svg/512px-Flag_of_Belarus.svg.png",
    },
  ];

  const [showCountryModal, setShowCountryModal] = useState(false);

  const first7Countries = countries.slice(0, 8);

  const openCountryModal = () => {
    setShowCountryModal(true);
  };

  const closeCountryModal = () => {
    setShowCountryModal(false);
  };

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
              <button onClick={openCountryModal} className="text-orange-600 hover:text-orange-500 font-medium flex items-center gap-1">
                See All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 mt-4">
              {first7Countries.map((country, index) => (
                <div key={index} className="flex items-center py-2">
                  <img 
                    src={country.flag} 
                    alt={country.name} 
                    className="h-10 w-10 rounded-full object-cover" 
                  />
                  <p className="ml-3 text-gray-700">{country.name}</p>
                </div>
              ))}
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

      {/* Country Modal */}
      {showCountryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6">
              <h2 className="text-xl font-semibold">All Supported Countries</h2>
              <button 
                onClick={closeCountryModal} 
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 px-6 pb-5">
              {countries.map((country, index) => (
                <div key={index} className="flex items-center py-2">
                  <img 
                    src={country.flag} 
                    alt={country.name} 
                    className="h-8 w-8 rounded-full object-cover" 
                  />
                  <p className="ml-3 text-gray-700">{country.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPreview;