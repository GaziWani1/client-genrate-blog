import { CoinsIcon, Menu } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const DashboardNavbar = ({
  toggleSidebar,
  credits,
}: {
  toggleSidebar: any;
  credits: number;
}) => {
  const { user } = useAuth();
  return (
    <div className="w-full flex justify-between bg-neutral-100  items-center  px-3">
      <div className=" w-full py-3 px-3 ">
        <div className="flex w-full flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center">
            <button type="button" onClick={toggleSidebar}>
              <Menu className="cursor-pointer" />
            </button>
          </div>

          <div className="flexitems-center justify-end flex-row  gap-2 sm:gap-4 text-center sm:text-right ">
            <h1 className="text-primary gap-2 flex items-center font-semibold mx-auto text-sm sm:text-base">
              <h1 className="flex text-gray-50 gap-1 justify-between items-center bg-gray-400 p-1 rounded">
                <CoinsIcon /> {credits}
              </h1>
              Hey, {user?.name}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
