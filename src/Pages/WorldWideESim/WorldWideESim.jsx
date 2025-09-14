import banner from '../../assets/images/travelBG.jpg'

const WorldWideESim = () => {
    return (
        <div className='container mx-auto px-4 py-10'>
            <div className="relative h-[500px] rounded-lg overflow-hidden mt-16">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${banner})`,
                }}>
              </div>
            
        </div>
        </div>
    );
};

export default WorldWideESim;