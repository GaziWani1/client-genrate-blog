import BannerImage from '../assets/hero-banner.png';
import image2 from '../assets/secondsectionpic.jpeg';
import image3 from '../assets/image3.jpeg';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full h-[610px] overflow-hidden">
        <img
          src={BannerImage}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-[#00000089] text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
            Generate Stories With AI
          </h1>
          <p className="mt-4 text-white text-lg md:text-xl font-medium max-w-3xl drop-shadow-sm">
            Generate Short Story{' '}
            <span className="bg-red-700 px-2 py-1 rounded">Scripts</span> For{' '}
            <span className="bg-red-400 px-2 py-1 rounded">
              Instagram Reels
            </span>
            ,{' '}
            <span className="bg-red-700 px-2 py-1 rounded">YouTube Shorts</span>{' '}
            <br />
            and other Social Media Platforms
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 items-center px-4 sm:px-20 py-12 bg-gray-50">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-800">
            🧠 Welcome to Story Gen AI
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Unleash the Power of AI-Driven Storytelling. <br />
            Story Gen AI helps you craft captivating tales in seconds. Whether
            you're an aspiring writer, content creator, or game developer —
            we've got your imagination covered.
          </p>
        </div>
        <div>
          <img
            src={image2}
            alt="Story illustration"
            className="w-full rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 items-center px-4 sm:px-20 py-12">
        <div className="hidden sm:block">
          <img
            src={image3}
            alt="Features"
            className="w-full rounded-xl shadow-md"
          />
        </div>
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-800">
            ✨ What You Can Do with Story Gen AI
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 text-lg">
            <li>
              Create original stories in any genre — Fantasy, Romance, Thriller,
              Sci-Fi & more
            </li>
            <li>Customize characters and plots to suit your ideas</li>
            <li>Generate content for games, books, blogs, or social media</li>
            <li>Collaborate with AI as your co-writer or editor</li>
            <li>Save, edit & share your stories instantly</li>
          </ul>
        </div>
      </section>

      {/* Suggested Stories Section */}
      <section className="px-4 sm:px-20 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📚 Generated Stories You May Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder for future story cards */}
          <div className="col-span-full text-center text-gray-400">
            Coming soon...
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
