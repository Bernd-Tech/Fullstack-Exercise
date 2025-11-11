import { useState } from "react";
import { supabase } from "../supabase-client";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

const initialLogInData = {
  email: "",
  password: "",
};

export const LogInPage = () => {
  const [logInData, setLogInData] = useState(initialLogInData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFromData = (e) => {
    const { name, value } = e.target;
    setLogInData((prevData) => (
      {
        ...prevData,
        [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { data, error } = await supabase.auth.signInWithPassword({
      email: logInData.email,
      password: logInData.password,
    });

    if (error) {
        console.error("Error logging in:", error)
        return
    }
    console.log(data)
    setIsLoggedIn(true);
    setLogInData(initialLogInData)
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center gap-12">
        <div className="flex flex-col gap-6 bg-(--color-dark) w-[40%] rounded-[40px] p-8">
          <div className="w-full flex flex-col gap-1 items-center">
            <h1 className="text-xl font-semibold">Log in to Essentia AI</h1>
            {isLoggedIn ? (
                <p>You are logged in!</p>
            ) : (
                <p>Welcome back! Please log in to continue</p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 [&>div]:gap-8 [&>div>input]:h-10 [&>div>input]:outline-0 [&>div>input]:input-style">
              <div className="flex flex-col !gap-1">
                <label htmlFor="email">E-Mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={logInData.email}
                  onChange={handleFromData}
                  required
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
                  value={logInData.password}
                  onChange={handleFromData}
                  required
                />
                {/* {password && (
            <p className="text-red-500"></p>
          )} */}
              </div>
            </div>
            <Button type="submit" text="Continue" />
          </form>
        </div>
        <div>
          <p>
            Don't have an account yet?{" "}
            <Link className="border-b-1" to="/sign-up">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
