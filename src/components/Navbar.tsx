import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { login } from '../utils/api';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../Context/AuthContext';
import Button from './Button';
import { LogOutIcon } from 'lucide-react';

const Navbar = () => {
  const { login: setAuth, user, logout } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (token: string) => login(token),
    onSuccess: (res: any) => {
      if (res?.data.token && res?.data.user) {
        setAuth(res?.data.token, res?.data.user);
      }
    },
    onError: (error) => {
      console.error('Login Error:', error);
    },
  });

  return (
    <section className="flex flex-col sm:flex-row items-center justify-between bg-white py-3 px-4 sm:px-8 shadow gap-3 sm:gap-0">
      <h1 className="text-black font-semibold text-lg sm:text-2xl">
        <Link to="/" className="text-red-500 font-serif">
          Blog <span className="text-blue-500">Gen</span>
          <span className="text-slate-600">.Ai</span>
        </Link>
      </h1>

      <nav className="flex flex-wrap items-center w-full sm:w-auto p-2 rounded sm:p-0 bg-red-200 sm:bg-white justify-center gap-2 sm:gap-4 text-sm">
        {user ? (
          <>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              <span className="hidden sm:inline">Welcome,</span> {user.name}
            </span>

            <Button
              onClick={() => navigate('/dashboard')}
              className="bg-red-400 text-xs sm:text-sm sm:px-4 sm:py-[8px] rounded-full"
            >
              <span>Create</span>
            </Button>

            <Button
              onClick={logout}
              className="flex items-center gap-2 sm:gap-3 text-black bg-red-200"
            >
              <LogOutIcon className="size-4 sm:size-5 text-red-800" />
              <span className="hidden sm:block">Logout</span>
            </Button>
          </>
        ) : (
          <div className="scale-[0.9] sm:scale-100">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const token = credentialResponse.credential;
                if (token) loginMutation.mutate(token);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        )}
      </nav>
    </section>
  );
};

export default Navbar;
