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
            {...register("aiLimitation", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="aiLimitation">I understand this AI cannot diagnose, prescribe medication, or replace professional therapy.</label>
          </div>
          {errors.aiLimitation && (
                <p className="text-red-500 indent-5.5">{errors.aiLimitation.message}</p>
            )}
        </div>

        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="technologyLimitation"
            {...register("technologyLimitation", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="technologyLimitation">I understand AI responses are generated and may have limitations or errors.</label>
          </div>
        
        {errors.technologyLimitation && (
                <p className="text-red-500 indent-5.5">{errors.technologyLimitation.message}</p>
            )}
        </div>
        </div>

        <div className="flex-col gap-4">
        <h1 className="text-xl">Medical Disclaimers</h1>
        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="crisisDisclaimer"
            {...register("crisisDisclaimer", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="crisisDisclaimer">In case of experiencing thoughts of self-harm, suicide, or any other mental health crisis, I understand that this AI is <b>not equipped to provide emergency assistance</b>.</label>
        </div>
            {errors.crisisDisclaimer && (
                <p className="text-red-500 indent-5.5">{errors.crisisDisclaimer.message}</p>
            )}
        </div>

        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="supportDisclaimer"
            {...register("supportDisclaimer", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="supportDisclaimer">I understand this service provides AI-assisted mental health support for general wellness purposes only.</label>
        </div>
            {errors.supportDisclaimer && (
                <p className="text-red-500 indent-5.5">{errors.supportDisclaimer.message}</p>
            )}
        </div>
        </div>
    </div>
    </>
  );
};
