import { Link } from "react-router-dom";
import banner from "../../assets/images/myEsim.svg";

const MyEsim = () => {
  return (
    <div className="mt-16 bg-[#FFFADD]">
      <div className="container mx-auto ">
        <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-2 items-center justify-center  px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Image Section */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <img
              src={banner}
              alt="eSIM Banner"
              className="w-full object-contain"
            />
          </div>
          {/* Text Section */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="mb-6 sm:mb-8 lg:mb-10">
              <h1 className="text-[#69AA58] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug sm:leading-tight lg:leading-tight mb-4 sm:mb-6 lg:mb-8">
                You currently do <br /> not have any <br /> eSIM plans
              </h1>
              <p className="text-[#69AA58] text-base sm:text-lg md:text-xl lg:text-2xl font-medium mb-4 sm:mb-6">
                Get 5% discount on your first purchase
              </p>
              <button className="mt-6 sm:mt-8 lg:mt-10 inline-block hover:scale-105 transition-transform">
                <Link
                  to="/worldwide"
                  className="bg-[#69AA58] text-white py-2 px-6 sm:py-3 sm:px-8 lg:py-3 lg:px-10 rounded-full text-base sm:text-lg md:text-xl font-medium"
                >
                  Shop
                </Link>
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default MyEsim;
