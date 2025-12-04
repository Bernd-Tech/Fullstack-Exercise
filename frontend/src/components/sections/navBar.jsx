import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { supabase } from "../../supabase-client";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export const NavBar = () => {
  const {user} = useAuth();
  const [showDropdown, setShowDropdown] = useState(false)
  // const [isSignedOut, setIsSignedOut] = useState(false);
  console.log(user);

  const signOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out: ", error);
    }
    setShowDropdown(false);
  };

  return (
    <>
      <header className="glass-effect w-screen h-[70px] fixed top-0 z-10">
          { user ? (
            <>
            <nav className="flex justify-between items-center w-full h-full px-8 font-medium text-lg">
            <div className="">
            <Link to="/">
              <p className="font-semibold linear-gradient text-2xl">Essentia AI</p>
            </Link>
          </div>
            <ul className="col-end-auto flex items-center gap-12">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
            <li 
            className="dropdown cursor-pointer"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)} >
              <p>Account</p>
              {showDropdown && (
                <div className="dropdown-content text-base rounded-lg [&>p]:dropdown-item w-50 right-0 glass-effect2 border border-gray-700/50">
                <p className="px-6 py-5 border-b border-gray-700/50">{user.user_metadata.preferred_name}</p>
                <div className="[&>p]:dropdown-item">
                 <p className="flex items-center gap-2 hover:bg-white/10 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span className="text-base">Settings</span>
                  </p>
                  <p onClick={signOut} className="flex items-center gap-2 hover:bg-red-600/10 transition">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span className="text-base">Sign out</span>
                  </p>
                </div>
              </div>
              )}
            </li>
          </ul>
          </nav>
          </>
          ) : (
            <>
            <nav className="grid grid-cols-[1fr_1fr_1fr] items-center w-full h-full px-8 font-medium text-lg">
            <div className="">
            <Link to="/">
              <p className="font-semibold linear-gradient text-2xl">Essentia AI</p>
            </Link>
          </div>
            <ul className="flex gap-12 justify-self-center">
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
          <ul className="flex items-center gap-12 justify-self-end">
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/sign-up">
                <Button text="Get started" />
              </Link>
            </li>
          </ul>
          </nav>
          </>
          )}
      </header>
    </>
  );
};
