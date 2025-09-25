import { Checkbox } from "../../ui/Checkbox";

export const InitialAssessmentPage = ({ register, watch }) => {
  const concernsOptions = [
    { value: "anxiety", label: "Anxiety" },
    { value: "depression", label: "Depression" },
    { value: "stress", label: "Stress Management" },
    { value: "relationships", label: "Relationship Issues" },
    { value: "work", label: "Work/Career Issues" },
    { value: "trauma", label: "Trauma/PTSD" },
    { value: "grief", label: "Grief/Loss" },
    { value: "selfesteem", label: "Self-Esteem" },
    { value: "sleep", label: "Sleep Issues" },
    { value: "other", label: "Other" },
  ];

  return (
    <>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-(--color-light) mb-2">
            Initial Assessment
          </h2>
          <p className="text-(--color-light)">
            This information helps us personalize your experience. All questions
            are optional, and you can skip anything you're not comfortable
            sharing.
          </p>
        </div>

        <section className="space-y-6">
          <h3 className="text-lg font-semibold border-b border-b-(--color-light)/50 pb-2">
            Current Concerns
          </h3>
          <div className="flex flex-col w-full space-y-8">
          <div className="flex flex-col w-full pb-6 border-b border-b-(--color-light)/50">
          <label className="block font-medium mb-4">
            What areas would you like to work on? (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {concernsOptions.map(({ value, label }) => (
              <Checkbox
                key={`concern-${value}`}
                id={`concern-${value}`}
                label={label}
                register={register}
                name={`initialAssessment.concerns.${value}`}
              />
            ))}
          </div>
          </div>
          <div className="flex flex-col w-full pb-8 border-b border-b-(--color-light)/50">
          <label className="block font-medium mb-4">
            Overall, how would you rate your current level of distress or
            difficulty?
          </label>
          <input
            className="w-full mb-4"
            type="range"
            min={0}
            max={10}
            id="stress-level"
            step={1}
            {...register("initialAssessment.concerns.stressLevel", { 
                required: false,
                default: 0
            })}
          />
          <div className="flex justify-between">
        <p>None (0)</p>
          <output>{watch("initialAssessment.concerns.stressLevel")}</output>
          <p>High (10)</p>
          </div>
          </div>
          </div>
        </section>
      </div>
    </>
  );
};
