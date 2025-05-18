import { useQuery, useMutation } from '@tanstack/react-query';
import { getSubsriptions, getUserSubsriptions, subscribe } from '../utils/api';
import Button from '../components/Button';
import { useAuth } from '../Context/AuthContext';
import { calculateDays } from '../utils/helper';
import { useEffect, useState } from 'react';

// Types
type SubscriptionPlan = {
  id: string;
  _id: string;
  name: string;
  price: string;
  description: string;
};

type SubscriptionListResponse = {
  data: SubscriptionPlan[];
};

type UserSubscription = {
  plan: string;
  currentPeriodEnd: string; // ISO string
};

type UserSubscriptionResponse = {
  data: UserSubscription[];
};

const Billing = () => {
  const { token } = useAuth();
  const [timeDiff, setTimeDiff] = useState('');

  // Get all subscriptions
  const {
    data: allPlans,
    isLoading,
    isError,
    error,
  } = useQuery<SubscriptionListResponse, Error>({
    queryKey: ['allSubscriptions'],
    queryFn: getSubsriptions,
  });

  // Get user’s current subscription
  const {
    data: subscriptionData,
    isLoading: loadingSubscription,
    isError: isSubError,
    error: subErr,
  } = useQuery<UserSubscriptionResponse, Error>({
    queryKey: ['userSubscriptions'],
    queryFn: () => getUserSubsriptions(token!),
    enabled: !!token,
  });

  // Handle subscribe
  const {
    mutate: subscribeToPlan,
    isPending,
    isError: isSubscribeError,
    error: subscribeError,
  } = useMutation({
    mutationFn: (id: string) => subscribe(token!, id),
    onSuccess: (result) => {
      window.location.href = result.url;
    },
  });

  const handleSubscribe = (id: string) => {
    subscribeToPlan(id);
  };

  return (
    <section className="py-10 px-4 sm:px-10">
      <h1>Comming soon</h1>
      {/* <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Billing Plans</h1>
        <p className="text-gray-600 text-lg mb-10">
          Choose the plan that best fits your needs. Upgrade anytime.
        </p>

        {isError && <div className="text-red-500">Error: {error.message}</div>}
        {isSubscribeError && (
          <div className="text-red-500">Error: {subscribeError.message}</div>
        )}
        {isLoading && (
          <div className="text-gray-500">Loading subscriptions...</div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-800">Free Plan</h2>
            <p className="text-gray-600 mt-2">12 credits / day</p>
            <Button
              className="mt-4 self-end w-full text-sm bg-gray-200 text-gray-800 cursor-default"
              disabled
            >
              Free Plan
            </Button>
          </div>

          {allPlans?.data?.map((subs: SubscriptionPlan) => (
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

              {subscriptionData?.data[0]?.plan === subs.name ? (
                <div className="self-end text-white text-center rounded p-2 w-full text-sm bg-red-400 cursor-not-allowed">
                  Current Plan
                  <h1>
                    {calculateDays(subscriptionData?.data[0]?.currentPeriodEnd)}
                  </h1>
                </div>
              ) : (
                <Button
                  disabled={isPending}
                  onClick={() => handleSubscribe(subs.id)}
                  className="w-full text-sm bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isPending ? 'Loading...' : 'Subscribe'}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default Billing;
