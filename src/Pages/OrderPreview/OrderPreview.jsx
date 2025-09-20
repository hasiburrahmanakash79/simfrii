import RewardOffer from "../HomePage/RewardOffer/RewardOffer";

const OrderPreview = () => {
  return (
    <div className="h-screen my-24 container mx-auto p-4">
      <RewardOffer />

      <div className="">
        <h1 className="text-3xl font-semibold text-center my-10">
          Order preview
        </h1>
        <div className="grid grid-cols-2 gap-5">
            <div className="border border-gray-200 rounded-xl p-7">
          <div className="flex justify-between items-center ">
            <h1 className="text-xl font-semibold">Supported Countries</h1>
            <button>See All</button>
          </div>
        </div>
        <div className="border border-gray-200 "></div>
        </div>
      </div>
    </div>
  );
};

export default OrderPreview;
