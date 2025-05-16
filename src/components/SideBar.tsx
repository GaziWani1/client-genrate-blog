import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClockFading, LogOut, X } from 'lucide-react';
import { SideBarItems } from '../constants';
import { googleLogout } from '@react-oauth/google';
import { useAuth } from '../Context/AuthContext';

const Sidebar = ({
  collapsed,
  toggleSidebar,
}: {
  collapsed: boolean;
  toggleSidebar: () => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const renderNavLinks = () =>
    SideBarItems.map(({ title, link, icon: IconComponent }) => {
      const isActive =
        link === '/dashboard'
          ? location.pathname === '/dashboard'
          : location.pathname.includes(link.split('/')[3]);

      return (
        <Link
          key={link}
          to={link}
          className={`flex items-center gap-3 p-3 rounded transition-colors ${
            isActive
              ? 'bg-blue-500 text-white'
              : 'text-gray-800 hover:bg-gray-100'
          }`}
        >
          <IconComponent
            size={20}
            className={isActive ? 'text-white' : 'text-gray-800'}
          />
          {!collapsed && (
            <span className="text-sm font-medium whitespace-nowrap">
              {title}
            </span>
          )}
        </Link>
      );
    });

  const renderLogout = () => (
    <button
      onClick={() => {
        googleLogout();
        logout();
        navigate('/');
      }}
      className="flex items-center gap-3 p-3 bg-red-400 hover:bg-red-300 transition-colors rounded text-gray-100 w-full"
    >
      <LogOut size={20} />
      {!collapsed && (
        <span className="text-sm font-medium whitespace-nowrap">Logout</span>
      )}
    </button>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden sm:flex h-screen bg-neutral-100 flex-col justify-between  text-gray-700 w-${
          collapsed ? '16' : '64'
        } transition-all duration-300`}
      >
        <div>
          <div className="flex items-center justify-center h-20 py-4 px-4">
            {collapsed ? (
              <h1 className="font-semibold text-sm text-red-500 font-serif">
                Blog
              </h1>
            ) : (
              <h1 className="font-semibold text-xl text-red-500 font-serif">
                Blog <span className="text-blue-500">Gen</span>
                <span className="text-slate-600">.Ai</span>
              </h1>
            )}
          </div>
          <nav className="flex flex-col gap-2 p-2">{renderNavLinks()}</nav>
        </div>
        <div className="p-2">{renderLogout()}</div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full sm:hidden flex flex-col justify-between bg-white w-64 max-w-[16rem] transition-transform duration-300 ${
          collapsed ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div>
          <div className="flex items-center justify-between px-4 py-4">
            {collapsed ? (
              <h1 className="font-semibold text-sm text-red-500 font-serif">
                Blog
              </h1>
            ) : (
              <h1 className="font-semibold text-xl text-red-500 font-serif">
                Blog <span className="text-blue-500">Gen</span>
                <span className="text-slate-600">.Ai</span>
              </h1>
            )}
            <X onClick={toggleSidebar} className="cursor-pointer" size={24} />
          </div>
          <nav className="flex flex-col gap-2 p-2">{renderNavLinks()}</nav>
        </div>
        <div className="p-2">{renderLogout()}</div>
      </aside>
    </>
  );
};

export default Sidebar;
