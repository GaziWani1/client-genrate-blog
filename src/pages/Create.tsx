import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createStoryApi } from '../utils/api';
import { useAuth } from '../Context/AuthContext';
import Input from '../components/Input';
import Select from '../components/Select';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import MarkDownComponent from '../components/MarkDownComponent';

const Create = ({ setCredits }: { setCredits: any }) => {
  const { token }: { token: any } = useAuth();

  const [formData, setFormData] = useState({
    blogType: '',
    readingTime: 1,
    timeUnit: 'minute',
    blogAbout: '',
  });

  const timeUnitOptions = [{ label: 'Minutes', value: 'minute' }];

  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: async (formData) => {
      const res = await createStoryApi(formData, token);
      setCredits((prev: number) => prev - 3);
      return res.data.data;
    },
    mutationKey: ['blogs', 'credits'],
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

  console.log(error);

  return (
    <section className="flex shadow rounded mt-3 justify-center flex-col w-full p-4">
      <h1 className="my-4 flex text-3xl text-gray-600 py-2 border-b border-gray-300 font-semibold">
        Generate Blog By Using AI{' '}
      </h1>
      <form
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 w-full"
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
          required
          disabled
        />

        <Select
          label="Time Unit"
          value={formData.timeUnit}
          onChange={handleChange}
          options={timeUnitOptions}
          name="timeUnit"
          required
          disabled
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
        <span className="  text-sm text-black">3 Credits / Blog</span>

        <div className="sm:col-span-2 md:col-span-4">
          <button
            type="submit"
            className={`${
              isError
                ? 'bg-gray-200 text-black cursor-not-allowed'
                : 'bg-blue-600'
            } text-white px-4 py-2 rounded`}
            disabled={isPending || isError}
          >
            {isPending ? 'Generating Blog...' : 'Create Blog'}
          </button>
        </div>

        {isError && (
          <div className="sm:col-span-4 text-red-600 text-center">
            {error?.response?.data?.error}
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

            <MarkDownComponent blog={data?.blog} />
          </div>
        )}
      </form>
    </section>
  );
};

export default Create;
