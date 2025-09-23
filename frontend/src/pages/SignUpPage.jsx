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

  const [currentPage, setCurrentPage] = useState(2);

  const nextPage = async () => {
    const isValid = await trigger();
    if (isValid) {
        // getValues() for entire form data without re-rendering the page
        console.log(getValues())
        setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-35 gap-12">
        {currentPage === 1 && (<h1 className="text-5xl">Create an account</h1>)}
        {currentPage > 1 && (<>
        <h1 className="text-5xl">Welcome to Essentia AI, {getValues("preferredName")}.</h1>
        <p>To assure you have an enriching experience with Essentia, we kindly ask of you to fill out the following form as accurate as possible. This will help Essentia in assessing your needs pre-appointment and make the most of your valuable time.<br /> All information given will be kept confidential.</p>
        </>)}
        <div className="bg-(--color-dark) w-[50%] rounded-[40px] p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {currentPage === 1 && (
              <>
                <SignUpPage1 register={register} errors={errors} getValues={getValues}/>
                <div className="flex justify-end">
                <Button text="Continue" type="button" onClick={nextPage} />
                </div>
              </>
            )}

            {currentPage === 2 && (
              <>
                <SignUpPage2 register={register} errors={errors} getValues={getValues}/>
              </>
            )}

        {(currentPage > 1 && currentPage < 4) && (
            <div className="flex justify-between">
            <Button type="button" onClick={prevPage} text="Back" />
            <Button type="button" onClick={nextPage} text="Next" />
            </div>
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
