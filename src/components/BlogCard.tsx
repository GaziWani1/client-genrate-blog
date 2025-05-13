import React from 'react';
import { Heart, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Button from './Button'; // This import is unused; remove if not needed
import { deleteBlog } from '../utils/api';
import { useAuth } from '../Context/AuthContext';

interface BlogCardProps {
  data: {
    _id: string;
    title: string;
    blog: string;
    likes: number;
  };
  home?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ data, home = false }) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: deleteBlogMutate } = useMutation({
    mutationFn: async (blogId: string) => {
      const res = await deleteBlog(blogId, token!);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('Blog deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (err) => {
      console.error('Failed to delete blog:', err);
      toast.error('Failed to delete blog');
    },
  });

  const linkPrefix = home ? '/blogs/view/' : '/dashboard/blogs/view/';

  return (
    <div className="relative group rounded overflow-hidden p-2 bg-slate-100">
      {/* Delete Icon */}
      {!home && (
        <Trash
          className="absolute top-1 sm:top-2 border p-1 right-2 size-9 sm:size-7 bg-slate-500 rounded text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer transition"
          onClick={() => deleteBlogMutate(data._id)}
        />
      )}

      <div className="flex justify-between flex-col space-y-2">
        <h1 className="text-gray-600 font-semibold text-xl">{data.title}</h1>
        <p className="font-normal text-gray-500 h-[5rem]">
          {data.blog.slice(0, 110)}...
        </p>
        <div className="w-full my-2 flex justify-between">
          <span className="flex items-center text-gray-500 gap-1 text-sm">
            <Heart className="size-5" />
            {data.likes}
          </span>
          <Link
            to={`${linkPrefix}${data._id}`}
            className="text-sm rounded-full text-white px-6 py-2 bg-gray-500"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
