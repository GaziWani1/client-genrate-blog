import { Link } from 'react-router-dom';
import Button from './Button';

const Navbar = () => {
  return (
    <section className="flex justify-between bg-white py-2 px-6 shadow sm:px-20">
      <h1 className="text-black underline font-semibold text-2xl">
        <Link to="/">
          Story <span className="text-blue-500 ">gen</span>
        </Link>
      </h1>
      <nav className="flex gap-5">
        <Button className=" bg-slate-700 ">Login</Button>
      </nav>
    </section>
  );
};

export default Navbar;
