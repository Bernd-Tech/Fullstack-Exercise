import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { supabase } from "../../supabase-client";
import { useAuth } from "../../hooks/useAuth";
import { useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export const NavBar = ({showLogo = true}) => {
  const { user } = useAuth();
  const dropdownMenu = useRef(null);
  const { isOpen, setIsOpen } = useClickOutside({
    elementRef: dropdownMenu,
    eventType: "mousedown",
  });

  // useEffect(() => {
  //   console.log(user);
  //   const handleClickOutside = (e) => {
  //     // checking if ref has been assigned and ref current does not contain the element targeted by "mousedown" event (meaning: event target is outside of dropdown menu)
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       setOpen(false);
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside);
  //   // Always have to return a "clean up" function when using an addEventListener()-> removes event listener
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

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
            <nav className={`flex ${showLogo ? 'justify-between' : 'justify-end'} items-center w-full h-full px-8 font-medium text-lg`}>
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
                    <span>{user.user_metadata.preferred_name}</span>
                    <svg className="w-4 h-4" fill="#76e04b" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="rgb(226, 226, 226)" stroke-width="15.6"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M128,180a3.98881,3.98881,0,0,1-2.82861-1.17139l-80-80.00024a4.00009,4.00009,0,0,1,5.65722-5.65674L128,170.34326l77.17139-77.17163a4.00009,4.00009,0,0,1,5.65722,5.65674l-80,80.00024A3.98881,3.98881,0,0,1,128,180Z"></path> </g></svg>                    </p>
                  {isOpen && (
                    <>
                    <div className="dropdown-content text-base rounded-xl [&>p]:dropdown-item w-50 top-10 right-0 glass-effect2 border border-(--color-light)/20 animate-scale-in">
                      <p className="px-6 py-5 border-b border-(--color-light)/20">
                        {user.user_metadata.preferred_name}
                      </p>
                      <div className="[&>p]:dropdown-item">
                          <Link to="/dashboard/ai-guide"
                            className="flex items-center gap-2 hover:bg-white/10 transition dropdown-item">
                        
                            <svg className="w-6 h-6" viewBox="0 0 640 640">
                              <path
                                fill="rgb(226, 226, 226)"
                                d="M304 70.1C313.1 61.9 326.9 61.9 336 70.1L568 278.1C577.9 286.9 578.7 302.1 569.8 312C560.9 321.9 545.8 322.7 535.9 313.8L527.9 306.6L527.9 511.9C527.9 547.2 499.2 575.9 463.9 575.9L175.9 575.9C140.6 575.9 111.9 547.2 111.9 511.9L111.9 306.6L103.9 313.8C94 322.6 78.9 321.8 70 312C61.1 302.2 62 287 71.8 278.1L304 70.1zM320 120.2L160 263.7L160 512C160 520.8 167.2 528 176 528L224 528L224 424C224 384.2 256.2 352 296 352L344 352C383.8 352 416 384.2 416 424L416 528L464 528C472.8 528 480 520.8 480 512L480 263.7L320 120.3zM272 528L368 528L368 424C368 410.7 357.3 400 344 400L296 400C282.7 400 272 410.7 272 424L272 528z"
                              />
                            </svg>{" "}
                            <span className="text-base">Dashboard</span>
                        
                          </Link>
                        <p className="flex items-center gap-2 hover:bg-white/10 transition">
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                          <span className="text-base">Settings</span>
                        </p>
                        <p
                          onClick={signOut}
                          className="flex items-center gap-2 hover:bg-red-600/10 transition border-t border-(--color-light)/20"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            ></path>
                          </svg>
                          <span className="text-base">Sign out</span>
                        </p>
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
