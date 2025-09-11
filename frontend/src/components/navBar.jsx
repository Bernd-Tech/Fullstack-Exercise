export const NavBar = () => {
  return (
    <>
      <header className="bg-black w-full h-[70px] fixed top-0">
        <nav className="flex justify-between w-full h-full items-center px-8">
            <div className="text-white">
                Essentia AI
            </div>
            <ul className="text-white flex gap-12">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <ul className="text-white flex gap-8">
                <li>Log in</li>
                <li>Sign Up</li>
            </ul>
        </nav>
      </header>
    </>
  );
};
