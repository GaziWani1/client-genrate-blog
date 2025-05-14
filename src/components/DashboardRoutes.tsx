import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import SideBar from './SideBar';
import DashboardNavbar from './DashboardNavbar';
import Create from '../pages/Create';
import { useAuth } from '../Context/AuthContext';
import UserBlogs from '../pages/UserBlogs';
import ViewBlog from './ViewBlog';
import Billing from '../pages/Billing';
import { useQuery } from '@tanstack/react-query';
import { getCredit } from '../utils/api';

const DashboardRoutes = () => {
  const { token, user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['credits'],
    queryFn: () => getCredit(token!),
    enabled: !!token,
  });

  useEffect(() => {
    if (data?.data?.credits !== undefined) {
      setCredits(data.data.credits);
    }
  }, [data]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex relative h-screen overflow-x-hidden w-full scrollbar-hide">
      <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar toggleSidebar={toggleSidebar} credits={credits} />
        <main className="flex-1 h-[90vh] overflow-auto bg-white px-3 sm:px-6">
          <Routes>
            <Route index element={<Create setCredits={setCredits} />} />
            <Route path="/user/blogs" element={<UserBlogs />} />
            <Route
              path="/blogs/view/:id"
              element={<ViewBlog isDashboard={true} />}
            />
            <Route path="/billing" element={<Billing />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardRoutes;
