import Spline from "@splinetool/react-spline";
import { Link } from 'react-router-dom';
import { Button } from "./ui/Button";

export const NavBar = () => {
  return (
    <>
      <header className="glass-effect w-screen h-[70px] fixed top-0 z-10">
        <nav className="grid grid-cols-[1fr_1fr_1fr] items-center w-full h-full px-8 font-medium text-lg">
            <div className="justify-self-start">
            <Link to="/">
                <p className="font-semibold linear-gradient">Essentia AI</p>
            </Link>
            </div>
            <ul className="flex gap-12 justify-self-center">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact us</Link></li>
            </ul>
            <ul className="flex items-center gap-8 justify-self-end">
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/sign-up"><Button text="Get started"/></Link></li>
            </ul>
        </nav>
      </header>
    </>
  );
};
