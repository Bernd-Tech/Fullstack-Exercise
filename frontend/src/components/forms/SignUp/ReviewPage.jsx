export const ReviewPage = ({ getValues }) => {
  const formData = getValues();

  return (
    <>
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-(--color-light) mb-2">
            Summary of your entries
          </h2>
          <p className="text-(--color-light)">
            Please review your information carefully before submitting. You can
            edit any section by clicking the "Edit" button.
          </p>
        </div>

        <section className="space-y-6 w-full p-4 border-1 bg-(--color-light) text-(--color-dark) rounded-xl">
          <h3 className="text-xl font-semibold border-b border-b-(--color-dark)/50 pb-2">
            Account information
          </h3>
          <div className="flex flex-col gap-4 [&>div]:flex">
            <div>
              <label className="w-1/2">Full Name:</label>
              <p className="">
                {formData?.user?.first_name} {formData?.user?.last_name}
              </p>
            </div>
            <div>
              <label className="w-1/2">Preferred Name:</label>
              <p className="">{formData?.user?.preferred_name}</p>
            </div>
            <div>
              <label className="w-1/2">Age:</label>
              <p className="">{formData?.user?.age}</p>
            </div>
            <div className="!flex-row">
              <label className="w-1/2">Country:</label>
              <p className="">{formData?.user?.country}</p>
            </div>
            <div className="!flex-row">
              <label className="w-1/2">City:</label>
              <p className="">{formData?.user?.city}</p>
            </div>

            <div>
              <label className="w-1/2">E-Mail:</label>
              <p className="">{formData?.user?.email}</p>
            </div>
          </div>
        </section>

        <section className="space-y-6 w-full p-4 border-1 bg-(--color-light) text-(--color-dark) rounded-xl">
          <h3 className="text-xl font-semibold border-b border-b-(--color-dark)/50 pb-2">
            Agreements & Consents
          </h3>
          <div className="flex flex-col gap-4 [&>div]:flex">
            <div className="flex items-baseline gap-2">
              <input
                type="checkbox"
                checked={(formData?.consent?.technology_limitation && formData?.consent?.ai_limitation) || false}
                readOnly
              />
              <label htmlFor="technologyLimitation">
                AI Service Limitations And Error Margin Acknowledged
              </label>
            </div>
            <div className="flex items-baseline gap-2">
              <input
                type="checkbox"
                checked={(formData?.consent?.support_disclaimer && formData?.consent?.crisis_disclaimer) || false}
                readOnly
              />
              <label htmlFor="technologyLimitation">
                Medical Disclaimers Accepted
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-6 w-full p-4 border-1 bg-(--color-light) text-(--color-dark) rounded-xl">
          <h3 className="text-xl font-semibold border-b border-b-(--color-dark)/50 pb-2">
            Initial Assessment
          </h3>
          <div className="flex flex-col gap-4 [&>div]:flex">
            <div className="flex">
              <label className="basis-1/2">Current Concerns:</label>
              <div className="basis-1/2">
            {
            //   formData?.initialAssessment?.concerns?.current_concerns?.map((concern) => { 
            //     return concern[0].toUpperCase() + concern.slice(1);
            //   })
            //   .join(', ')
            formData?.initialAssessment?.concerns?.current_concerns?.join(', ')
            }
            </div>
            </div>
            <div className="">
              <label className="w-1/2">Distress Level:</label>
              <p className="">{formData?.initialAssessment?.concerns?.stress_level}/10</p>
            </div>
            <div className="">
              <label className="w-1/2">Sleep Patterns:</label>
              <p className="">{formData?.initialAssessment?.concerns?.sleep_pattern}</p>
            </div>        
            <div className="">
              <label className="w-1/2">Duration of concerns:</label>
              <p className="">{formData?.initialAssessment?.concerns?.concerns_duration}</p>
            </div>
            <div className="">
              <label className="w-1/2">Counseling Experience:</label>
              <p className="">{formData?.initialAssessment?.previous_experience}</p>
            </div> 
          </div>
        </section>

        {/* <section className="space-y-6 w-full p-4 border-1 bg-(--color-light) text-(--color-dark) rounded-xl">
          <h3 className="text-xl font-semibold border-b border-b-(--color-dark)/50 pb-2">
            Previous Experience
          </h3>
          <div className="flex flex-col gap-4 [&>div]:flex">
            <div className="">
              <label className="w-1/2">Counseling Experience:</label>
              <p className="">{formData?.initialAssessment?.previous_experience}</p>
            </div> 
          </div>
        </section> */}
      </div>
    </>
  );
};
