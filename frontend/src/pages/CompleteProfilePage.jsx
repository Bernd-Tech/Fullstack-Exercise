import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateAccountPage } from "../components/forms/SignUp/CreateAccountPage";
import { ConsentPage } from "../components/forms/SignUp/ConsentPage";
import { InitialAssessmentPage } from "../components/forms/SignUp/InitialAssessmentPage";
import { ReviewPage } from "../components/forms/SignUp/ReviewPage";
import { Button } from "../components/ui/Button";

export const CompleteProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    trigger,
    watch
  } = useForm({
    defaultValues: {
        initialAssessment: {
            concerns: {
                stress_level: 0 
            }
        }
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

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
        <h1 className="text-5xl">Welcome to Essentia AI, {getValues("preferredName")}.</h1>
        <p>To assure you have an enriching experience with Essentia, we kindly ask of you to fill out the following form as accurate as possible. This will help Essentia in assessing your needs pre-appointment and make the most of your valuable time.<br /> All information given will be kept confidential.</p>
        <div className="flex gap-4">
            <Button text="Consent Page" type="button" onClick={() => setCurrentPage(1)} />
            <Button text="Personal Details" type="button" onClick={() => setCurrentPage(2)} />
            <Button text="Initial Assessment" type="button" onClick={() => setCurrentPage(3)} />
            <Button text="Summary Page" type="button" onClick={() => setCurrentPage(4)} />
        </div>
        <div className="bg-(--color-dark) w-[50%] rounded-[40px] p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            {currentPage === 1 && (
              <>
                <ConsentPage register={register} errors={errors} getValues={getValues}/>
              </>
            )}

            {currentPage === 2 && (
              <>
                <CreateAccountPage register={register} errors={errors} getValues={getValues} watch={watch}/>
              </>
            )}

            {currentPage === 3 && (
              <>
                <InitialAssessmentPage register={register} getValues={getValues} watch={watch}/>
              </>
            )}

        {(currentPage < 4) && (
            <div className="flex justify-between">
            <Button type="button" onClick={prevPage} text="Back" />
            <Button type="button" onClick={nextPage} text="Next" />
            </div>
        )}

        {currentPage === 4 && ( 
            <ReviewPage getValues={getValues}/>
        )}  
          </form>
        </div>
      </div>
    </>
  );
};
