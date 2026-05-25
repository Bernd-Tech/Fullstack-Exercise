import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { supabase } from "../../supabase-client";
import { useAuth } from "../../hooks/useAuth";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { 
  SettingsIcon,
  HomeIcon,
  SignoutIcon
 } from "../ui/icons";

export const NavBar = ({showLogo = true}) => {
  const { user } = useAuth();
  const dropdownMenu = useRef(null);
  const { isOpen, setIsOpen } = useClickOutside({
    elementRef: dropdownMenu,
    eventType: "mousedown",
  });

  const signOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out: ", error);
    }
    setIsOpen(false);
  };

  return (
    <>
      <header className="glass-effect w-full md:h-[70px]">
        {user ? (
          <>
            <nav className={`flex ${showLogo ? 'justify-between' : 'justify-end'} items-center w-full h-full px-8 font-medium text-base`}>
              {showLogo && (
                <div>
                <Link to="/">
                  <p className="font-semibold linear-gradient text-2xl">
                    Essentia AI
                  </p>
                </Link>
              </div>
              )}
              <ul className="col-end-auto flex items-center gap-12">
                <li>
                  <Link to="/contact">Contact us</Link>
                </li>
                <li
                  className="dropdown cursor-pointer"
                  ref={dropdownMenu}
                  onClick={() => setIsOpen(prev => !prev)}
                >
                  <p className="flex items-center gap-1.5">
                    <span>{user.user.user_metadata.preferred_name}</span>
                    <svg className="w-4 h-4" fill="#76e04b" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="rgb(226, 226, 226)" stroke-width="15.6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M128,180a3.98881,3.98881,0,0,1-2.82861-1.17139l-80-80.00024a4.00009,4.00009,0,0,1,5.65722-5.65674L128,170.34326l77.17139-77.17163a4.00009,4.00009,0,0,1,5.65722,5.65674l-80,80.00024A3.98881,3.98881,0,0,1,128,180Z"></path> </g></svg>                    </p>
                  {isOpen && (
                    <>
                    <div className="dropdown-content rounded-lg [&>p]:dropdown-item w-50 top-10 right-0 bg-(--color-dark) border border-(--color-light)/20 animate-scale-in">
                      <p className="px-6 py-5 border-b border-(--color-light)/20">
                        {user.user.user_metadata.preferred_name}
                      </p>
                      <div className="[&>div]:dropdown-item">
                          <Link to="/ai-guide"
                            className="flex items-center gap-2 hover:bg-white/10 transition dropdown-item">
                            <div className="w-5 h-5 flex items-center justify center">
                              <HomeIcon size="5"/>
                            </div>
                            <span className="text-base">Dashboard</span>
                        
                          </Link>
                        <div className="flex items-center gap-2 hover:bg-white/10 transition">
                          <div>
                            <SettingsIcon size="5"/>
                          </div>
                          <span className="text-base">Settings</span>
                        </div>
                        <div
                          onClick={signOut}
                          className="flex items-center gap-2 hover:bg-red-600/10 transition border-t border-(--color-light)/20"
                        >
                         <div>
                          <SignoutIcon size="5"/>
                         </div>
                          <span className="text-base">Sign out</span>
                        </div>
                      </div>
                    </div>
                    </>
                  )}
                </li>
              </ul>
            </nav>
          </>
        ) : (
          <>
            <nav className="grid grid-cols-[1fr_1fr] items-center w-full h-full px-8 font-medium text-lg">
              <div className="">
                <Link to="/">
                  <p className="font-semibold linear-gradient text-2xl">
                    Essentia AI
                  </p>
                </Link>
              </div>
              <ul className="flex items-center gap-12 justify-self-end">
                <li>
                  <Link to="/contact">Contact us</Link>
                </li>
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
