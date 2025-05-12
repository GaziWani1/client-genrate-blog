import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createStoryApi } from '../utils/api';
import { useAuth } from '../Context/AuthContext';
import Input from '../components/Input';
import Select from '../components/Select';
import ReactMarkdown from 'react-markdown';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const Create = () => {
  const { token }: { token: any } = useAuth();

  const [formData, setFormData] = useState({
    blogType: '',
    readingTime: '',
    timeUnit: 'minute',
    blogAbout: '',
  });

  const timeUnitOptions = [{ label: 'Minutes', value: 'minute' }];

  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: async (formData) => {
      const res = await createStoryApi(formData, token);
      console.log(res.data.data);
      return res.data.data;
    },
    mutationKey: ['blogs'],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <section className="flex shadow rounded mt-3 justify-center flex-col w-full p-4">
      <form
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 w-full"
        onSubmit={handleSubmit}
      >
        <Input
          label="Blog Type"
          placeholder="e.g., Technical, Lifestyle"
          name="blogType"
          value={formData.blogType}
          onChange={handleChange}
          required
        />

        <Input
          label="Estimated Reading Time"
          type="number"
          name="readingTime"
          placeholder="e.g., 5"
          value={formData.readingTime}
          onChange={handleChange}
          required
        />

        <Select
          label="Time Unit"
          value={formData.timeUnit}
          onChange={handleChange}
          options={timeUnitOptions}
          name="timeUnit"
          required
        />

        <div className="sm:col-span-2 md:col-span-4">
          <label htmlFor="blogAbout" className="block mb-1 font-medium">
            Blog About
          </label>
          <textarea
            name="blogAbout"
            id="blogAbout"
            className="w-full border-2 px-3 py-2 rounded border-gray-300"
            rows={3}
            value={formData.blogAbout}
            onChange={handleChange}
            required
          />
        </div>

        <div className="sm:col-span-2 md:col-span-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={isPending}
          >
            {isPending ? 'Generating Blog...' : 'Create Blog'}
          </button>
        </div>

        {isError && (
          <div className="sm:col-span-4 text-red-600 text-center">
            Error: {error.message}
          </div>
        )}
        {isSuccess && (
          <div className="sm:col-span-4 flex flex-col border border-gray-300  p-3 rounded shadow ">
            <Copy
              onClick={async () => {
                await navigator.clipboard.writeText(data.blog);
                toast.success('Copied Successfully');
              }}
              className="text-black self-end border p-2 cursor-pointer rounded size-9"
            />

            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl font-bold text-gray-800 mb-4"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl font-semibold text-gray-800 mb-3"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-xl font-semibold text-gray-700 mb-2"
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    className="text-lg font-medium text-gray-700 mb-2"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-base text-gray-700 leading-relaxed mb-4"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside text-gray-700 mb-4"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside text-gray-700 mb-4"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="mb-1 ml-4" {...props} />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
                    {...props}
                  />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-blue-600 hover:underline" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img className="my-4 rounded-lg max-w-full" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-gray-800" {...props} />
                ),
                em: ({ node, ...props }) => (
                  <em className="italic text-gray-700" {...props} />
                ),
                hr: () => <hr className="my-6 border-gray-300" />,
              }}
            >
              {data?.blog}
            </ReactMarkdown>
          </div>
        )}
      </form>
    </section>
  );
};

export default Create;
