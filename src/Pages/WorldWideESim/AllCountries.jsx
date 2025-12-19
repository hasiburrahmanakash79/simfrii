import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import useFetchCountries from "../../components/hook/useFetchCountries";

const AllCountries = () => {
  const {countries, loading} = useFetchCountries()

  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.title.toLowerCase().includes(search.toLowerCase())
  );

  if(loading){
    return(
      <div>
        Loading
      </div>
    )
  }

  return (
    <div className="my-10">
      <div className="mb-6 md:flex justify-between items-center gap-4">
        <h2 className="text-2xl md:text-3xl text-center md:text-left font-medium mb-6">All Countries</h2>
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search countries..."
            className="border border-gray-300 p-2 outline-none rounded-full w-full pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 ">
        {filteredCountries.map((country, index) => (
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
              className="w-8 h-8 md:h-10 md:w-10 rounded-full object-cover"
            />
            <div>
              
            <p className="">{country?.title}</p>
            <p className="text-xs text-gray-400">Country code: {country?.country_code}</p>
            </div>
          </Link>
        ))}
        {filteredCountries.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No countries found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllCountries;
