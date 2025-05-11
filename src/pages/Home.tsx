import BannerImage from '../assets/hero-banner.png';

import image2 from '../assets/secondsectionpic.jpeg';
import image3 from '../assets/image3.jpeg';
import Navbar from '../components/Navbar';
const Home = () => {
  return (
    <>
      <Navbar />
      <section className="w-full flex justify-center items-center min-h-[610px]">
        <div className="w-full  min-h-[600px] relative overflow-hidden">
          {/* Banner Image */}
          <img
            src={BannerImage}
            alt="Banner"
            className="w-full h-[610px] object-cover "
          />

          {/* Overlay */}
          <div className="absolute flex flex-col space-y-2 inset-0 bg-[#04020c58] bg-opacity-40  justify-center items-center">
            <h1 className="text-white text-4xl md:text-6xl font-bold text-center px-4">
              Generate Stories With AI
            </h1>
            <p className="text-white text-xl font-semibold text-center  my-4">
              Generate Short Story{' '}
              <span className="bg-red-700 px-2 py-1">Script</span> For{' '}
              <span className="bg-red-400 py-1 px-2  ">Instagarm reel</span> ,{' '}
              <span className="bg-red-700 px-2 py-1">Youtube Shorts</span>{' '}
              <br /> And Other Social Media Apps
            </p>
          </div>
        </div>
      </section>
      <section className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 items-center justify-center min-h-[200px] px-3 sm:px-20 py-3 mt-5">
        <div className=" flex flex-col  space-y-3">
          <h1 className=" text-2xl font-semibold">
            🧠 Welcome to Story Gen AI
          </h1>
          <p className="  text-gray-800 ">
            Unleash the Power of AI-Driven Storytelling Story Gen AI helps you
            create captivating stories in seconds.
            <br /> Whether you're an aspiring writer, a content creator, a game
            developer, or just looking for creative fun <br /> we’ve got your
            imagination covered.
          </p>
        </div>
        <img src={image2} className="w-full h-[560px]" />
      </section>
      <section className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 items-center justify-center min-h-[200px] px-3 sm:px-20 py-3 mt-5">
        <img src={image3} className=" hidden sm:flex w-full h-[560px]" />
        <div className=" flex flex-col space-y-3">
          <h1 className=" text-2xl font-semibold">
            ✨ What You Can Do with Story Gen AI
          </h1>
          <ul className="space-y-1 text-gray-800">
            <li>
              👉 Create Original Stories in Any Genre — Fantasy, Romance,
              Thriller, Sci-Fi, and more
            </li>
            <li>👉 Customize Characters and Plots to fit your unique ideas</li>
            <li>
              👉 Generate Stories for Games, Books, Blogs, or Social Media
            </li>
            <li>👉 Collaborate with AI as your co-writer or editor</li>
            <li>👉 Save, Edit & Share your stories instantly</li>
          </ul>
        </div>
      </section>
      <section className="px-3 py-2 sm:px-20">
        <h1 className=" text-2xl font-semibold">
          Generated Stories You May Like
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"></div>
      </section>
    </>
  );
};

export default Home;
