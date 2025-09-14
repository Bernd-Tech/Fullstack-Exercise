import Spline from "@splinetool/react-spline";
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <>
      <header className="glass-effect w-full h-[70px] fixed top-0 z-10">
        <nav className="flex justify-between w-full h-full items-center px-8">
            
            <Link to="/">
            <div className="flex items-center">
                {/* <img className="h-auto w-[80px] border" src="../assets/logo.png" alt="logo" /> */}
                <p className="font-semibold linear-gradient">Essentia AI</p>
            </div>
            </Link>
            
            <ul className="flex gap-12">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
            </ul>
            <ul className="flex gap-8">
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>
        </nav>
      </header>
    </>
  );
};
