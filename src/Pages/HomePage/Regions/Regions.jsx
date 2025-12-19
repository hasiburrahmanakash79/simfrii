import { Link } from "react-router-dom";
import RegionCard from "../../../components/RegionCard";
import useFetchRegions from "../../../components/hook/useFetchRegions";

const Regions = () => {
  const { regions } = useFetchRegions();

  // console.log(regions);
  return (
    <div className="my-14">
      <h2 className="text-2xl md:text-3xl font-medium text-center md:text-left mb-4">
        Regions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
        {regions.map((region, index) => (
          <Link
            key={index}
            to={`/region/${region?.slug}`}
          >
            <RegionCard
              name={region?.title}
              image={region?.image?.url}
              bgColor={region?.bgColor}
              slug={region?.slug}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Regions;