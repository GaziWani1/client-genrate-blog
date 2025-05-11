import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SideBar from './SideBar';
import DashboardNavbar from './DashboardNavbar';
import Create from '../pages/Create';

const DashboardRoutes = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <div className="flex relative h-screen  overflow-x-hidden  w-full scrollbar-hide ">
        <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar} />

        <div className="flex-1 flex flex-col">
          <DashboardNavbar toggleSidebar={toggleSidebar} />
          <main className=" flex-1 h-[90vh] overflow-auto bg-white px-3 sm:px-6 ">
            <Routes>
              <Route index element={<Create />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardRoutes;
