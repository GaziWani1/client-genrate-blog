import { useQuery } from '@tanstack/react-query';
import { getSubsriptions, subscribe } from '../utils/api';
import Button from '../components/Button';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Initialize Stripe (replace with your publishable key from Stripe dashboard)
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

const Billing = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['subscription'],
    queryFn: getSubsriptions,
  });

  const handleSubscribe = async (id: any) => {
    setLoading(true);
    try {
      const result = await subscribe(id);
      window.location.href = result.url;
    } catch (error) {}
    setLoading(false);
  };

  return (
    <>
      {/* <Navbar /> */}

      <section className=" py-10 px-4 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Billing Plans
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            Choose the plan that best fits your needs. Upgrade anytime.
          </p>

          {isError && (
            <div className="text-red-500">Error: {error.message}</div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold text-gray-800">Free Plan</h2>
              <p className="text-gray-600 mt-2">12 credits / day</p>
              <Button
                className="mt-4 self-end w-full text-sm bg-gray-200 text-gray-800 cursor-default"
                disabled
              >
                Current Plan
              </Button>
            </div>

            {isLoading && <div className="text-gray-500">Loading...</div>}

            {/* Dynamic Subscriptions */}
            {data?.data?.map((subs: any) => (
              <div
                key={subs._id}
                className="bg-white space-y-3 p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {subs.name}
                </h2>
                <h1 className="text-5xl text-gray-700 font-semibold">
                  {subs.price}
                </h1>
                <p className="text-gray-600 mt-2">{subs.description}</p>
                <Button
                  disabled={isLoading}
                  onClick={() => handleSubscribe(subs.id)}
                  className=" w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {loading ? 'loading...' : 'Subscribe'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Billing;
