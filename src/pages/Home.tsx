import BannerImage from '../assets/hero-banner.png';

import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAllBogs } from '../utils/api';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search input to avoid excessive requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // reset to page 1 on new search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blogs', debouncedSearch, currentPage],
    queryFn: () => getAllBogs(debouncedSearch, currentPage, 9),
  });

  const meta = data?.data?.meta;
  const blogs = data?.data?.userBlogs;

  const handleClearSearch = () => {
    setSearch('');
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (meta && currentPage < meta.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative w-full h-[510px] overflow-hidden">
        <img
          src={BannerImage}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-[#00000089] text-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
            Create 1-Minute Blogs Instantly with AI
          </h1>
          <p className="my-4 text-white text-lg md:text-xl font-medium max-w-3xl drop-shadow-sm">
            Turn your ideas into{' '}
            <span className="bg-red-700 px-2 py-1 rounded">quick-read</span>{' '}
            blogs for{' '}
            <span className="bg-red-400 px-2 py-1 rounded">websites</span>,
            <span className="bg-red-700 px-2 py-1 rounded">newsletters</span>,
            and more — all in under a minute.
          </p>
          <div className="flex items-center w-full mx-auto sm:w-[500px] bg-white p-2 gap-2 rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              className="flex-grow outline-none border-none bg-transparent text-gray-800 placeholder:text-gray-400 px-2"
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={handleClearSearch}
                className="text-gray-500 bg-black rounded-full flex justify-center items-center w-10 h-10 hover:text-gray-700 transition-colors"
              >
                <X size={23} className="text-white" />
              </button>
            )}
            <button
              onClick={() => setDebouncedSearch(search)}
              className="text-gray-500 bg-black rounded-full flex justify-center items-center w-10 h-10 hover:text-gray-700 transition-colors"
            >
              <Search size={23} className="text-white" />
            </button>
          </div>
        </div>
      </section>

      <section className=" h-auto px-4 my-10 sm:px-20 mb-4">
        <h2 className="text-3xl font-bold text-gray-800 my-8">
          📝 Suggested Blogs You May Like
        </h2>
        {isLoading && <p className="my-10">Loading...</p>}
        {isError && <p>Error: {(error as any)?.message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {blogs?.map((e: any) => (
            <BlogCard key={e.id} data={e} home={true} />
          ))}
        </div>

        {/* Pagination */}
        {meta && meta.totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {meta.page} of {meta.totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === meta.totalPages}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>

      <div className="w-full flex justify-center bg-slate-100 items-center py-7">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Blog Gen.Ai. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Home;

{
  /* Welcome Section */
}
{
  /* <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 items-center px-4 sm:px-20 py-12 bg-gray-50">
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
      </section> */
}

{
  /* Features Section */
}
{
  /* <section className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 items-center px-4 sm:px-20 py-12">
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
      </section> */
}
