import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { supabase } from "../../supabase-client";
import { useAuth } from "../../hooks/useAuth";

export const NavBar = () => {
  const {user} = useAuth();
  // const [isSignedOut, setIsSignedOut] = useState(false);

  const signOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out: ", error);
    }
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
             <li>
              <Button text="Sign Out" type="button" onClick={signOut} />
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
