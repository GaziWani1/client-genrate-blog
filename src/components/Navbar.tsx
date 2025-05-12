import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { login } from '../utils/api'; // assumes this sends token to backend and returns user info
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../Context/AuthContext';
import Button from './Button';

const Navbar = () => {
  const { login: setAuth, user } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (token: string) => login(token), // should return { token, user }
    onSuccess: (res: any) => {
      console.log(res?.data.token, res?.data.user);
      if (res?.data.token && res?.data.user) {
        setAuth(res?.data.token, res?.data.user);
      }
    },
    onError: (error) => {
      console.error('Login Error:', error);
    },
  });

  return (
    <section className="flex justify-between bg-white py-3 px-6 shadow sm:px-20">
      <h1 className="text-black font-semibold text-2xl">
        <Link to="/" className="text-red-500 font-serif">
          Blog <span className="text-blue-500">Gen</span>
          <span className="text-slate-600">.Ai</span>
        </Link>
      </h1>

      <nav className="flex gap-5 items-center">
        {user ? (
          <>
            <Button
              onClick={() => {
                navigate('/dashboard');
              }}
              className=" bg-red-400 px-2 py-[8px] text-sm rounded-full"
            >
              Create
            </Button>
            <span className="text-sm font-semibold text-gray-700 ">
              Welcome, {user.name}
            </span>
          </>
        ) : (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const token = credentialResponse.credential;
              if (token) loginMutation.mutate(token);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        )}
      </nav>
    </section>
  );
};

export default Navbar;
