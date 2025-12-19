import { Link } from "react-router-dom";
import useFetchCountries from "../../../components/hook/useFetchCountries";

const PopularCountries = () => {
  const { countries } = useFetchCountries();

  const sliceCountries = countries?.slice(0, 16);

  return (
    <div className="my-10">
      <h2 className="md:text-3xl text-xl font-medium mb-4">
        Popular Countries
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 ">
        {sliceCountries.map((country, index) => (
          <Link
            to={`/worldwide-esim/${country?.slug
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
            key={index}
            className="flex items-center gap-5 border border-gray-300 md:p-4 p-2 rounded-xl mb-4 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <img
              src={country?.image?.url}
              alt={country?.title}
              className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
            />
            <div>
              <p className="">{country?.title}</p>
            <p className="text-xs text-gray-400">Country code: {country?.country_code}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link
          to="/worldwide"
          className="border border-gray-300 px-10 md:py-4 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          See all 200+ countries
        </Link>
      </div>
    </div>
  );
};

export default PopularCountries;
