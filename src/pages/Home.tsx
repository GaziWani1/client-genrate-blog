import BannerImage from '../assets/hero-banner.png';
import Button from '../components/Button';

const Home = () => {
  return (
    <section className="w-full flex justify-center items-center min-h-[610px]">
      <div className="w-[95%] mt-5 rounded min-h-[600px] relative overflow-hidden">
        {/* Banner Image */}
        <img
          src={BannerImage}
          alt="Banner"
          className="w-full h-[610px] object-cover rounded"
        />

        {/* Overlay */}
        <div className="absolute flex flex-col space-y-2 inset-0 bg-[#04020c58] bg-opacity-40  justify-center items-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
            Generate Stories With AI
          </h1>
          <Button className=" bg-blue-400 rounded-4xl text-xl py-3 px-10 ">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
