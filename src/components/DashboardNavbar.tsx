import { Bell, Menu } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const DashboardNavbar = ({ toggleSidebar }: { toggleSidebar: any }) => {
  const { user } = useAuth();

  return (
    <div className="w-full flex justify-center items-center ">
      <div className=" w-full py-3 px-3 ">
        <div className="flex flex-row sm:items-center justify-between gap-4">
          {/* Left: Sidebar toggle */}
          <div className="flex items-center">
            <button type="button" onClick={toggleSidebar}>
              <Menu className="cursor-pointer" />
            </button>
          </div>

          {/* Right: User Info */}
          <div className="flex flex-row items-center sm:items-center gap-2 sm:gap-4 text-center sm:text-right w-full sm:w-auto justify-between sm:justify-end">
            <h1 className="text-primary font-semibold mx-auto text-sm sm:text-base">
              Hey, {user?.name}
            </h1>
            <div className="flex items-center justify-center gap-2 sm:gap-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
