import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { login } from '../utils/api';
import { useMutation } from '@tanstack/react-query';

const Navbar = () => {
  const loginMutation = useMutation({
    mutationFn: (token: string) => login(token),
    onSuccess: (data) => {
      console.log('Login Success:', data);
      // e.g., store token or user info in localStorage or context
    },
    onError: (error) => {
      console.error('Login Error:', error);
    },
  });

  return (
    <section className="flex justify-between bg-white py-2 px-6 shadow sm:px-20">
      <h1 className="text-black font-semibold text-2xl">
        <Link to="/" className="text-red-500 font-serif">
          Story <span className="text-blue-500">Gen</span>
          <span className="text-slate-600">.Ai</span>
        </Link>
      </h1>
      <nav className="flex gap-5">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const token = credentialResponse.credential;
            if (token) loginMutation.mutate(token);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </nav>
    </section>
  );
};

export default Navbar;
