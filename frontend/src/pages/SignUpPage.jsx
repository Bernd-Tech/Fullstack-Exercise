import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpPage1 } from "../components/forms/SignUpPage-1";
import { SignUpPage2 } from "../components/forms/SignUpPage-2";
import { Button } from "../components/ui/Button";

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    trigger
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  //   const [signUpData, setSignUpData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  //   const updateSignUpData = (e) => {
  //     e.preventDefault();
  //     const { name, value } = e.target;
  //     setSignUpData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   };

  const nextPage = () => {
    trigger();
    if (errors) {
        return 
    } else {
    setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-35 gap-12">
        <h1 className="text-5xl">Welcome to Essentia AI</h1>
        <div className="bg-(--color-dark) w-[50%] rounded-[40px] p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {currentPage === 1 && (
              <>
                <SignUpPage1 register={register} errors={errors} getValues={getValues}/>
                <div className="flex justify-end">
                <Button text="Next" onClick={nextPage} />
                </div>
              </>
            )}

            {currentPage === 2 && (
              <>
                <SignUpPage2 register={register} errors={errors} getValues={getValues}/>
                <div className="flex justify-between">
                <Button text="Back" onClick={prevPage} />
                <Button text="Next" onClick={nextPage} />
                </div>
              </>
            )}
          </form>
          {/* {currentPage === 1 &&
        ( <>
        <SignUpPage1 signUpData={signUpData} updateSignUpData={updateSignUpData}/>
        <div>
            <Button onClick={nextPage} text="Next" />
        </div>
        </>)}

         {currentPage === 2 &&
        ( <>
        <SignUpPage2 signUpData={signUpData} updateSignUpData={updateSignUpData}/>
        <div>
            <Button onClick={nextPage} text="Next" />
        </div>
        </>)}

        </div>

        {(currentPage > 1 && currentPage < 4) && (
            <div>
            <Button onClick={prevPage} text="Back" />
            <Button onClick={nextPage} text="Next" />
            </div>
        )}

        {(currentPage === 4) && (
            <div>
            <Button onClick={prevPage} text="Back" />
            <Button onClick={submit} text="Submit" />
            </div>
        )} */}
        </div>
      </div>
    </>
  );
};
