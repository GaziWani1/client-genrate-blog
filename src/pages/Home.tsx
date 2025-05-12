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
            Generate Blogs With AI
          </h1>
          <p className="mt-4 text-white text-lg md:text-xl font-medium max-w-3xl drop-shadow-sm">
            Generate Engaging{' '}
            <span className="bg-red-700 px-2 py-1 rounded">Blog Posts</span> for{' '}
            <span className="bg-red-400 px-2 py-1 rounded">Websites</span>,{' '}
            <span className="bg-red-700 px-2 py-1 rounded">Newsletters</span>{' '}
            <br />
            and other Content Platforms
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 items-center px-4 sm:px-20 py-12 bg-gray-50">
        <div className="space-y-5">
          <h2 className="text-3xl font-bold text-gray-800">
            ✍️ Welcome to Blog Gen AI
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Elevate your content game with AI-powered blogging. <br />
            Blog Gen AI helps marketers, entrepreneurs, and writers create
            high-quality blogs in minutes. Whether it’s SEO, niche topics, or
            thought leadership — we’ve got your content needs covered.
          </p>
        </div>
        <div>
          <img
            src={image2}
            alt="Blog illustration"
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
            🚀 What You Can Do with Blog Gen AI
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 text-lg">
            <li>Generate blog posts tailored to your niche or industry</li>
            <li>Optimize for SEO with keywords and meta descriptions</li>
            <li>Choose tone, length, and target audience with ease</li>
            <li>Create content calendars and outlines effortlessly</li>
            <li>Save drafts, edit, and publish content on the go</li>
          </ul>
        </div>
      </section>

      {/* Suggested Blogs Section */}
      <section className="px-4 sm:px-20 py-12 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          📝 Suggested Blogs You May Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder for future blog cards */}
          <div className="col-span-full text-center text-gray-400">
            Coming soon...
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
