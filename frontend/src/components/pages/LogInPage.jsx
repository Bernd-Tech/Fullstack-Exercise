import { useState } from "react";
import { supabase } from "../../supabase-client";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const initialLogInData = {
  email: "",
  password: "",
};

export const LogInPage = () => {
  const [logInData, setLogInData] = useState(initialLogInData);
  const {user} = useAuth();

  const handleFromData = (e) => {
    const { name, value } = e.target;
    setLogInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { error } = await supabase.auth.signInWithPassword({
      email: logInData.email,
      password: logInData.password,
    });

    if (error) {
      console.error("Error logging in:", error);
      return;
    }
    setLogInData(initialLogInData);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-4 radial-gradient">
        <div className="flex flex-col gap-8 w-[40%] p-8">
          <div className="w-full flex flex-col items-center gap-8">
            <Link to="/">
              <h1 className="font-semibold linear-gradient text-5xl">
                Essentia AI
              </h1>
            </Link>
            <div className="w-full flex flex-col gap-1 items-center">
              <h2 className="text-2xl font-semibold">Log in to your account</h2>
              <p>Welcome back! Please log in to continue</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 [&>div]:gap-8 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
              <div className="flex flex-col !gap-1">
                <label htmlFor="email">E-Mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="!py-5"
                  value={logInData.email}
                  onChange={handleFromData}
                  required
                  placeholder="Your email address..."
                />
                {/* {email && (
            <p className="text-red-500"></p>
          )} */}
              </div>

              <div className="flex flex-col !gap-1">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="!py-5"
                  value={logInData.password}
                  onChange={handleFromData}
                  required
                  placeholder="Your password..."
                />
                {/* {password && (
            <p className="text-red-500"></p>
          )} */}
              </div>
            </div>
            <Button className="" type="submit" text="Continue" />
          </form>
        </div>
        <div>
          <p className="text-lg">
            Don't have an account yet?{" "}
            <Link
              className="hover:text-(--color-dark) duration-300"
              to="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
