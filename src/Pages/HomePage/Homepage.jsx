import Hero from "./Hero/Hero";
import PopularCountries from "./PopularCountries/PopularCountries";
import RewardOffer from "./RewardOffer/RewardOffer";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-10">
        <RewardOffer />
        <PopularCountries />
      </div>
    </div>
  );
};

export default Homepage;
