import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <>
      <header className="bg-black w-full h-[70px] fixed top-0">
        <nav className="flex justify-between w-full h-full items-center px-8">
            <div className="text-white">
                Essentia AI
            </div>
            <ul className="text-white flex gap-12">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <ul className="text-white flex gap-8">
                <li><Link to="/login">Log in</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
            </ul>
        </nav>
      </header>
    </>
  );
};
