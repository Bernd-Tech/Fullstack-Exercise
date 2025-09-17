import { useState } from "react";
import { SignUpPage1 } from "../components/forms/SignUpPage-1";
import { Button } from "../components/ui/Button";

export const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const updateSignUpData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  return (
    <>
    <div className="flex flex-col items-center justify-center p-35 gap-12">
        <h1 className="text-5xl">Welcome to Essentia AI</h1>
        <div className="bg-(--color-dark) w-[50%] rounded-[40px] p-8">
        {currentPage === 1 && <SignUpPage1 signUpData={signUpData} updateSignUpData={updateSignUpData}/>}
        </div>
        <div>
            <Button onClick={nextPage} text="Next" />
        </div>
    </div>
    </>
  )
};
