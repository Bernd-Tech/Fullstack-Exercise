import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase-client";
import { CreateAccountPage } from "../forms/SignUp/CreateAccountPage";
import { ConsentPage } from "../forms/SignUp/ConsentPage";
import { InitialAssessmentPage } from "../forms/SignUp/InitialAssessmentPage";
import { ReviewPage } from "../forms/SignUp/ReviewPage";
import { Button } from "../ui/Button";
import { Confirmation } from "../Confirmation";

export const CompleteProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [isSignedOut, setIsSignedOut] = useState(false);
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // checking session data before getUser() because getUser() is NOT guaranteed to return the correct user on initial page load (because session hydration can lag behind React rendering)
        // Otherwise unwanted redirects
        const {data: sessionData} = await supabase.auth.getSession()
        console.log("This is the session data", sessionData);

        if (!sessionData.session) {
          navigate("/login");
          return;
        }

        const {data: {user}, error} = await supabase.auth.getUser();
        console.log("This is the user data ", user);


        if (!user || error) {
          navigate("/login");
          return;
        }

        setUserData(user)
        setLoading(false)

      } catch (error) {
        console.error(error);
         navigate("/login");
         return;
      }
    }
    fetchUser();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      initialAssessment: {
        concerns: {
          stress_level: 0,
        },
      },
    },
  });

  const onSubmit = async () => {
    const formData = getValues();

    const {error: profileError} = await supabase.from('profiles')
    .update({
      first_name: formData.user?.first_name,
      last_name: formData.user?.last_name,
      pronouns: formData.user?.pronouns === "Other" ? formData.user?.specific_pronouns : formData.user?.pronouns,
      country: formData.user?.country,
      city: formData.user?.city
    })
    .eq('id', userData.id);

    if (profileError) {
      console.log("Error updating user profile: ", profileError);
      return;
    }

    const {error: consentsError} = await supabase.from('consents')
    .insert({
      profile_id: userData.id,
      ai_limitation: formData.consent.ai_limitation,
      technology_limitation: formData.consent.technology_limitation,
      crisis_disclaimer: formData.consent.crisis_disclaimer,
      support_disclaimer: formData.consent.support_disclaimer
    })
    
    if (consentsError) {
      console.log("Error uploading user consents: ", consentsError);
      return;
    }

    const {error: assessmentError} = await supabase.from('initial_assessments')
    .insert({
      profile_id: userData.id,
      current_concerns: formData.initialAssessment.concerns.current_concerns,
      stress_level: parseInt(formData.initialAssessment.concerns.stress_level),
      sleep_pattern: formData.initialAssessment.concerns.sleep_pattern,
      concerns_duration: formData.initialAssessment.concerns.concerns_duration,
      previous_experience: formData.initialAssessment.previous_experience,
      conversation_goals: formData.initialAssessment.goals.conversation_goals,
      skill_goals: formData.initialAssessment.goals.skills,
      current_support: formData.initialAssessment.support_system.current_support,
      in_professional_care: formData.initialAssessment.support_system.in_professional_care,
      on_medication: formData.initialAssessment.support_system.on_medication,
      harmful_thoughts: formData.initialAssessment.support_system.harmful_thoughts
    })
    
    if (assessmentError) {
      console.log("Error uploading user consents: ", assessmentError);
      return;
    }

    reset();
    // ToDo: Have to navigate to dashboard page if successfull 
  };


  const nextPage = async () => {
    const isValid = await trigger();
    if (isValid) {
      // getValues() for entire form data without re-rendering the page
      console.log(getValues());
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // const signOut = async () => {
  //   let { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.error("Error signing out: ", error);
  //   }
  //   setIsSignedOut(true);
  // };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-35 gap-12">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className="text-5xl">
              Welcome to Essentia AI, {getValues("preferredName")}.
            </h1>
            <p>
              To assure you have an enriching experience with Essentia, we
              kindly ask of you to fill out the following form as accurate as
              possible. This will help Essentia in assessing your needs
              pre-appointment and make the most of your valuable time.
              <br /> All information given will be kept confidential.
            </p>
            <div className="flex gap-4">
              <Button
                text="Consent Page"
                type="button"
                onClick={() => setCurrentPage(1)}
              />
              <Button
                text="Personal Details"
                type="button"
                onClick={() => setCurrentPage(2)}
              />
              <Button
                text="Initial Assessment"
                type="button"
                onClick={() => setCurrentPage(3)}
              />
              <Button
                text="Summary Page"
                type="button"
                onClick={() => setCurrentPage(4)}
              />
            </div>
            <div className="bg-(--color-dark) w-[50%] rounded-[40px] p-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-8"
              >
                {currentPage === 1 && (
                  <>
                    <ConsentPage
                      register={register}
                      errors={errors}
                      getValues={getValues}
                    />
                  </>
                )}

                {currentPage === 2 && (
                  <>
                    <CreateAccountPage
                      register={register}
                      errors={errors}
                      getValues={getValues}
                      watch={watch}
                    />
                  </>
                )}

                {currentPage === 3 && (
                  <>
                    <InitialAssessmentPage
                      register={register}
                      getValues={getValues}
                      watch={watch}
                    />
                  </>
                )}

                {currentPage < 4 && (
                  <div className="flex justify-between">
                    <Button type="button" onClick={prevPage} text="Back" />
                    <Button type="button" onClick={nextPage} text="Next" />
                  </div>
                )}

                {currentPage === 4 && (
                  <>
                    <ReviewPage getValues={getValues} />
                    <Button type="submit" text="Submit" />
                  </>
                )}
              </form>
              {/* <Button text="Sign Out" type="button" onClick={signOut} /> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};
