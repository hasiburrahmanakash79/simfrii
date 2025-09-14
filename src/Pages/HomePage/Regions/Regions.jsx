import africa from "../../../assets/map/african.svg";
import asia from "../../../assets/map/asia.svg";
import europe from "../../../assets/map/europe.svg";
import northAmerica from "../../../assets/map/northAmerica.svg";
import oceania from "../../../assets/map/oceania.svg";
import southAmerica from "../../../assets/map/southAmerica.svg";

const Regions = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl font-medium mb-4">Regions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-5 mb-10">
        <div className="flex items-center gap-7 mb-5 bg-[#F8FFCD] h-[150px] p-3 rounded-lg">
          <div>
            <img src={africa} alt=""  className="h-[120px]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium">Africa</h1>
          </div>
        </div>
        <div className="flex items-center gap-7 mb-5 bg-[#FFEAFD] p-3 rounded-lg h-[150px] ">
          <div>
            <img src={asia} alt=""  className="h-[120px]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium">Asia</h1>
          </div>
        </div>
        <div className="flex items-center gap-7 mb-5 bg-[#D1E4FF] p-3 rounded-lg h-[150px] ">
          <div>
            <img src={oceania} alt=""  className="h-[120px]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium">Oceania</h1>
          </div>
        </div>
        <div className="flex items-center gap-7 mb-5 bg-[#E1FFDE] p-3 rounded-lg h-[150px] ">
          <div>
            <img src={europe} alt=""  className="h-[120px]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium">Europe</h1>
          </div>
        </div>
        <div className="flex items-center gap-7 mb-5 bg-[#FFE2E2] p-3 rounded-lg h-[150px] ">
          <div>
            <img src={northAmerica} alt=""  className="h-[120px]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium">North America</h1>
          </div>
        </div>
        <div className="flex items-center gap-7 mb-5 bg-[#C4FDFF] p-3 rounded-lg h-[150px] ">
          <div>
            <img src={southAmerica} alt=""  className="h-[120px]" />
          </div>
          <div>
            <h1 className="text-2xl font-medium">South America</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regions;
