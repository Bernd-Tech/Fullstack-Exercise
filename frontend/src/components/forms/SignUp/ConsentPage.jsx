export const ConsentPage = ({ register, errors}) => {
  return (
    <>
      <div className="flex flex-col gap-9 [&>div]:flex [&>div>input]:h-12 [&>div>input]:input-style">
        <div className="flex-col gap-4">
        <h1 className="text-xl">AI Service Understanding</h1>
        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
            id="aiLimitation"
            {...register("consent.ai_limitation", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="aiLimitation">I understand this AI cannot diagnose, prescribe medication, or replace professional therapy.</label>
          </div>
          {errors.consent?.ai_limitation && (
                <p className="text-red-500 indent-5.5">{errors.consent.ai_limitation.message}</p>
            )}
        </div>

        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="technologyLimitation"
            {...register("consent.technology_limitation", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="technologyLimitation">I understand AI responses are generated and may have limitations or errors.</label>
          </div>
        
        {errors.consent?.technology_limitation && (
                <p className="text-red-500 indent-5.5">{errors.consent.technology_limitation.message}</p>
            )}
        </div>
        </div>

        <div className="flex-col gap-4">
        <h1 className="text-xl">Medical Disclaimers</h1>
        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="crisisDisclaimer"
            {...register("consent.crisis_disclaimer", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="crisisDisclaimer">In case of experiencing thoughts of self-harm, suicide, or any other mental health crisis, I understand that this AI is <b>not equipped to provide emergency assistance</b>.</label>
        </div>
            {errors.consent?.crisis_disclaimer && (
                <p className="text-red-500 indent-5.5">{errors.consent.crisis_disclaimer.message}</p>
            )}
        </div>

        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id="supportDisclaimer"
            {...register("consent.support_disclaimer", {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor="supportDisclaimer">I understand this service provides AI-assisted mental health support for general wellness purposes only.</label>
        </div>
            {errors.consent?.support_disclaimer && (
                <p className="text-red-500 indent-5.5">{errors.consent.support_disclaimer.message}</p>
            )}
        </div>
        </div>
    </div>
    </>
  );
};
