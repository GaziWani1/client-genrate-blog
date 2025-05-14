import { Link, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeftCircle,
  Construction,
  Heart,
  Loader2,
  SplinePointer,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import Navbar from './Navbar';
import Button from './Button';
import { getBlog, likeBlog } from '../utils/api';
import MarkDownComponent from './MarkDownComponent';
import { useAuth } from '../Context/AuthContext';

type ViewBlogProps = {
  isDashboard?: boolean;
};

const ViewBlog = ({ isDashboard = false }: ViewBlogProps) => {
  const { token, user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const queryClient = useQueryClient();

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.data?.blog && user?._id) {
      const isLiked = data.data.blog.likedBy.includes(user._id);
      setLiked(isLiked);
    }
  }, [data, user]);

  const {
    mutate: likeMutate,
    isPending: isLiking,
    isError: isLikeError,
    error: likeError,
  } = useMutation({
    mutationFn: () => likeBlog(id!, !liked, token!),
    onSuccess: () => {
      setLiked((prev) => !prev);
      queryClient.invalidateQueries({ queryKey: ['userblogs', 'blogs'] });
    },
    onError: () => {
      setShowDialog(true);
    },
  });

  const blog = data?.data?.blog;

  return (
    <>
      {!isDashboard && <Navbar />}

      {isLoading && (
        <div className="flex h-screen w-full justify-center items-center">
          <SplinePointer className="animate-pulse size-12" />
        </div>
      )}

      {isError && <div>Error: {(error as Error).message}</div>}

      <section
        className={`w-full ${isDashboard ? 'py-3' : 'px-2 my-3 sm:px-24'}`}
      >
        <div className="flex gap-4 items-center w-full justify-between bg-white">
          <div className="flex gap-3 sm:gap-8 justify-between items-center">
            <Link
              to={isDashboard ? '/dashboard/user/blogs' : '/'}
              className="bg-gray-100 p-2 rounded"
            >
              <ArrowLeftCircle className="text-gray-500 size-9" />
            </Link>
            <h1 className="px-3 text-3xl text-sky-600 underline">
              {blog?.title}
            </h1>
          </div>

          {!isDashboard && (
            <Button
              onClick={() => {
                if (!token || !user) {
                  setShowDialog(true);
                  return;
                }
                likeMutate();
              }}
              className="bg-red-400 self-end"
              disabled={isLiking}
            >
              {isLiking ? (
                <Loader2 className=" animate-spin " />
              ) : (
                <Heart className={`${liked ? 'fill-white' : ''}`} />
              )}
            </Button>
          )}
        </div>
      </section>

      <section className={`${isDashboard ? 'p-3' : 'sm:px-24 px-3'}`}>
        <MarkDownComponent blog={blog?.blog} />
      </section>

      {showDialog && (
        <div className="fixed inset-0 bg-[#fefefe89] bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
              onClick={() => setShowDialog(false)}
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-2 text-red-600">
              Login Required
            </h2>
            <p className="text-gray-700">
              Please login first to like the blog post.
            </p>
          </div>
        </div>
      )}

      <footer className="w-full flex justify-center bg-slate-100 items-center py-7">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Blog Gen.Ai. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default ViewBlog;
