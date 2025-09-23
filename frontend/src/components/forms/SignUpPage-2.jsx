export const SignUpPage2 = ({ register, errors}) => {
  return (
    <>
      <div className="flex flex-col gap-9 [&>div]:flex [&>div>input]:h-12 [&>div>input]:input-style">
        <div className="flex-col gap-4">
        <h1 className="text-xl">AI Service Understanding</h1>
        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
            id="aiLimitation"
            {...register("consent.aiLimitation", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="aiLimitation">I understand this AI cannot diagnose, prescribe medication, or replace professional therapy.</label>
          </div>
          {errors.consent?.aiLimitation && (
                <p className="text-red-500 indent-5.5">{errors.consent.aiLimitation.message}</p>
            )}
        </div>

        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="technologyLimitation"
            {...register("consent.technologyLimitation", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="technologyLimitation">I understand AI responses are generated and may have limitations or errors.</label>
          </div>
        
        {errors.consent?.technologyLimitation && (
                <p className="text-red-500 indent-5.5">{errors.consent.technologyLimitation.message}</p>
            )}
        </div>
        </div>

        <div className="flex-col gap-4">
        <h1 className="text-xl">Medical Disclaimers</h1>
        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="crisisDisclaimer"
            {...register("consent.crisisDisclaimer", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="crisisDisclaimer">In case of experiencing thoughts of self-harm, suicide, or any other mental health crisis, I understand that this AI is <b>not equipped to provide emergency assistance</b>.</label>
        </div>
            {errors.consent?.crisisDisclaimer && (
                <p className="text-red-500 indent-5.5">{errors.consent.crisisDisclaimer.message}</p>
            )}
        </div>

        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="supportDisclaimer"
            {...register("consent.supportDisclaimer", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="supportDisclaimer">I understand this service provides AI-assisted mental health support for general wellness purposes only.</label>
        </div>
            {errors.consent?.supportDisclaimer && (
                <p className="text-red-500 indent-5.5">{errors.consent.supportDisclaimer.message}</p>
            )}
        </div>
        </div>
    </div>
    </>
  );
};
