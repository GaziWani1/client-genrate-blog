import { useQuery } from '@tanstack/react-query';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getBlogs } from '../utils/api';
import { useAuth } from '../Context/AuthContext';
import BlogCard from '../components/BlogCard';

const UserBlogs = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useAuth();

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
    queryFn: () => getBlogs(token!, debouncedSearch, currentPage, 8),
    enabled: !!token,
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
      <section className="flex w-full justify-center items-center my-6">
        <div className="flex items-center w-[400px] bg-white p-2 gap-2 rounded-full border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
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
      </section>

      <section className="mt-4 h-auto px-4 mb-4">
        <h1 className="text-gray-600 text-xl mb-4">Generate Blogs</h1>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {(error as any)?.message}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs?.map((e: any) => (
            <BlogCard key={e.id} data={e} home={false} />
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
    </>
  );
};

export default UserBlogs;
