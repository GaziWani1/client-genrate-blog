import { Heart, Trash } from 'lucide-react';
import React from 'react';
import Button from './Button';
import { useMutation } from '@tanstack/react-query';
import { deleteBlog } from '../utils/api';
import { useAuth } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const BlogCard = ({ data }: any) => {
  const { token } = useAuth();

  const {
    mutate: deleteBlogMutate,
    isPending,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: async (blogId: string) => {
      const res = await deleteBlog(blogId, token!); // assuming deleteBlog requires token
      return res.data.data;
    },
    mutationKey: ['blogs'],
    onSuccess: () => {
      toast.success('Blog Deleted Successfully');
    },
    onError: (err) => {
      console.error('Failed to delete blog:', err);
    },
  });

  return (
    <div className="relative group rounded overflow-hidden p-2 bg-slate-100">
      {/* Delete Icon */}
      <Trash
        className="absolute top-2 border p-1 right-2 size-7 bg-slate-500 rounded text-white opacity-0 group-hover:opacity-100 cursor-pointer transition"
        onClick={() => deleteBlogMutate(data?._id)}
      />

      <div className="flex justify-between flex-col space-y-2">
        <h1 className="text-gray-600 font-semibold text-xl">{data?.title}</h1>
        <p className="font-normal text-gray-500">
          {data?.blog?.slice(0, 80)}...
        </p>
        <div className="w-full my-2 flex justify-between">
          <span className="flex items-center text-gray-500 gap-1 text-sm">
            <Heart className="size-5" />
            {data?.likes}
          </span>
          <Button className="p-0 text-sm rounded-full bg-gray-500">View</Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
