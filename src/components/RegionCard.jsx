const RegionCard = ({ name, image, bgColor, slug }) => {
  return (
    <div
      className={`flex items-center gap-7 border border-gray-200 hover:scale-105 transition-transform cursor-pointer duration-300 hover:shadow-lg ${bgColor} p-3 rounded-2xl md:h-[150px]`}
    >
      <div className="rounded-xl">
        <img src={image} alt={name} className="md:h-[125px] h-[50px] min-w-[170px] rounded-xl" />
      </div>
      <div>
        <h1 className="md:text-2xl text-lg font-medium">{name}</h1>
        <p className="text-xs text-gray-400">{slug}</p>
      </div>
    </div>
  );
};

export default RegionCard;