'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createStoryApi } from '../utils/api';
import { useAuth } from '../Context/AuthContext';

const Create = () => {
  const { token }: { token: any } = useAuth();

  const [formData, setFormData] = useState({
    storyType: '',
    duration: '',
    timeUnit: 'minute',
    storyAbout: '',
  });

  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: async (formData) => {
      const res = await createStoryApi(formData, token);
      console.log(res.data.data);

      return res.data.data;
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(formData);
  };
  console.log(data, isSuccess);

  return (
    <section className="flex shadow rounded mt-3 justify-center flex-col w-full p-4">
      <form
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 w-full"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="storyType" className="block mb-1 font-medium">
            Story Type
          </label>
          <input
            type="text"
            name="storyType"
            id="storyType"
            className="w-full border-2 px-3 py-2 rounded border-gray-300"
            value={formData.storyType}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block mb-1 font-medium">
            Duration
          </label>
          <input
            type="number"
            name="duration"
            id="duration"
            className="w-full border-2 px-3 py-2 rounded border-gray-300"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="timeUnit" className="block mb-1 font-medium">
            Time Unit
          </label>
          <select
            name="timeUnit"
            id="timeUnit"
            className="w-full border-2 px-3 py-2 rounded border-gray-300"
            value={formData.timeUnit}
            onChange={handleChange}
          >
            <option value="seconds">Seconds</option>
            <option value="minute">Minute</option>
          </select>
        </div>

        <div className="sm:col-span-2 md:col-span-4">
          <label htmlFor="storyAbout" className="block mb-1 font-medium">
            Story About
          </label>
          <textarea
            name="storyAbout"
            id="storyAbout"
            className="w-full border-2 px-3 py-2 rounded border-gray-300"
            rows={2}
            value={formData.storyAbout}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="sm:col-span-2 md:col-span-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isPending}
          >
            {isPending ? 'Generating Story...' : 'Create Story'}
          </button>
        </div>

        {isError && (
          <div className="sm:col-span-4 text-red-600 text-center">
            Error: {error.message}
          </div>
        )}
        {isSuccess && (
          <div className="sm:col-span-4 border text-green-600 rounded shadow p-2">
            {data?.story}
          </div>
        )}
      </form>
    </section>
  );
};

export default Create;
