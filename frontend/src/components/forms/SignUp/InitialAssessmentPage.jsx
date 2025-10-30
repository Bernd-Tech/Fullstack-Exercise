import { Checkbox } from "../../ui/Checkbox";
import { RadioButtonGroup } from "../../ui/RadioButton";
import { Button } from "../../ui/Button";
import { useState, useEffect, useRef } from "react";

export const InitialAssessmentPage = ({ register, watch }) => {
  const [dialogAppeared, setDialogAppeared] = useState(false);
  const dialogRef = useRef();

  const stressLevel = watch("initialAssessment.concerns.stress_level");
  const harmfulThoughts = watch("initialAssessment.support_system.harmful_thoughts");

//   
  useEffect(() => {
    if (stressLevel >= 8 && !dialogAppeared) {
      showDialog();
      setDialogAppeared(true);
    }
  }, [stressLevel]);

  useEffect(() => {
    if (harmfulThoughts === "yes") {
        showDialog();
    }
  }, [harmfulThoughts]);

  const showDialog = () => {
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };

  const concernsOptions = [
    { value: "anxiety", label: "Anxiety" },
    { value: "depression", label: "Depression" },
    { value: "stress", label: "Stress Management" },
    { value: "relationships", label: "Relationship Issues" },
    { value: "work", label: "Work/Career Issues" },
    { value: "trauma", label: "Trauma/PTSD" },
    { value: "grief", label: "Grief/Loss" },
    { value: "self-esteem", label: "Self-Esteem" },
    { value: "sleep", label: "Sleep Issues" },
    { value: "other", label: "Other" }
  ];

  const sleepPatternOptions = [
    { value: "user has normal to good sleep", label: "Normal/good sleep" },
    { value: "user has difficulties falling asleep", label: "Difficulty falling asleep" },
    { value: "user frequently wakes during the night", label: "Frequent waking during night" },
    { value: "user sleeps too much", label: "Sleeping too much" },
    { value: "user has an irregular sleep schedule", label: "Irregular sleep schedule" }
  ];

  const durationOptions = [
    {
      value: "user has been experiencing concerns for less than 1 month",
      label: "Less than 1 month",
    },
    {
      value: "user has been experiencing concerns for 1 - 6 months",
      label: "1 - 6 months",
    },
    {
      value: "user has been experiencing concerns for 6 months to 1 year",
      label: "6 months to 1 year",
    },
    {
      value: "user has been experiencing concerns for 1 to 2 years",
      label: "1 to 2 years",
    },
    {
      value: "user has been experiencing concerns for more than 2 years",
      label: "More than 2 years",
    },
  ];

  const previousExperience = [
    {
      value: "user has been in therapy before",
      label: "Yes, I have been in therapy before",
    },
    {
      value: "user has not been in therapy before",
      label: "No, this is my first time",
    },
    { value: "user prefers not to answer", label: "Prefer not to answer" }
  ];

  const skillGoals = [
    { value: "coping-strategies", label: "Coping strategies" },
    { value: "problem-solving", label: "Problem-solving" },
    { value: "emotional-regulation", label: "Emotional regulation" },
    { value: "stress-management", label: "Stress management" },
    { value: "communication-skills", label: "Communication skills" },
    { value: "mindfullness-techniques", label: "Mindfullness techniques" }
  ];

  const supportSystem = [
    {
      value: "user has a strong support system",
      label: "Strong support system",
    },
    {
      value: "user has some support available",
      label: "Some support available",
    },
    { value: "user only has limited support", label: "Limited support system" },
    { value: "user prefers not to answer", label: "Prefer not to answer" }
  ];

  const standardRadioOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "user prefers not to say", label: "Prefer not to say" }
  ];

  const safetyRadioOptions = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes, I am having these thoughts" },
    { value: "user prefers not to say", label: "Prefer not to say" }
  ];

  return (
    <>
      <dialog
        ref={dialogRef}
        className="backdrop:backdrop-blur-sm z-1 p-4 bg-red-50 border border-red-200 rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex justify-between mb-2">
        <h3 className="text-red-800 font-semibold mb-2 text-lg">
          Immediate Support Available
        </h3>
        <button type="button" onClick={closeDialog} className="font-semibold bg-red-800 text-red-50 text-base px-3 rounded-lg hover:cursor-pointer hover:scale-95 duration-300 transition-all" autoFocus>
            X
        </button>
        </div>
        <p className="text-red-700 mb-2 text-base">
          If you're having thoughts of harming yourself or others, please reach
          out for immediate support:
        </p>
        <ul className="text-red-700 text-base space-y-1">
          <li>• National Suicide Prevention Lifeline: 988</li>
          <li>• Crisis Text Line: Text HOME to 741741</li>
          <li>• Emergency Services: 911</li>
        </ul>
      </dialog>
      
      <div className="space-y-8">
        <div className="text-center mb-12">
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
            <div className="flex flex-col w-full pb-6">
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
                    value={value}
                    name="initialAssessment.concerns.current_concerns"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full pb-8">
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
                {...register("initialAssessment.concerns.stress_level", {
                  required: false,
                  default: 0,
                })}
              />
              <div className="flex justify-between">
                <p>None (0)</p>
                <output>
                  {watch("initialAssessment.concerns.stress_level")}
                </output>
                <p>High (10)</p>
              </div>
            </div>
            <div className="flex flex-col w-full pb-6">
              <label className="block font-medium mb-4">
                How are your sleep patterns?
              </label>

              <RadioButtonGroup
                register={register}
                options={sleepPatternOptions}
                context="sleep-pattern"
                name="initialAssessment.concerns.sleep_pattern"
              />
            </div>
            <div className="flex flex-col w-full pb-6">
              <label className="block font-medium mb-4">
                For how long have you been experiencing these concerns?
              </label>

              <RadioButtonGroup
                register={register}
                options={durationOptions}
                context="duration"
                name="initialAssessment.concerns.concerns_duration"
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-semibold border-b border-b-(--color-light)/50 pb-2">
            Previous Experience
          </h3>
          <div className="flex flex-col w-full pb-6">
            <label className="block font-medium mb-4">
              Have you been in therapy or counseling before?
            </label>

            <RadioButtonGroup
              register={register}
              options={previousExperience}
              name="initialAssessment.previous_experience"
            />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-semibold border-b border-b-(--color-light)/50 pb-2">
            Your Goals
          </h3>
          <div className="space-y-6">
            <div className="flex flex-col w-full pb-6">
              <label htmlFor="user-goals" className="block font-medium mb-4">
                What do you hope to achieve through these conversations?
              </label>
              <textarea
                className="outline-1 rounded-xl p-2 min-h-26 max-h-46"
                id="user-goals"
                {...register("initialAssessment.goals.conversation_goals", {
                  required: false,
                })}
                placeholder="Share your goals, hopes, or what you would like to work on..."
              ></textarea>
            </div>

            <div className="flex flex-col w-full pb-6">
              <label htmlFor="user-goals" className="block font-medium mb-4">
                What skills or areas are you most interested in developing?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {skillGoals.map(({ value, label }) => (
                  <Checkbox
                    key={`goal-${value}`}
                    id={`skill-${value}`}
                    label={label}
                    value={value}
                    register={register}
                    name="initialAssessment.goals.skills"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-semibold border-b border-b-(--color-light)/50 pb-2">
            Current Support & Well-being
          </h3>
          <div className="flex flex-col w-full pb-6">
            <label
              className="block font-medium mb-4"
            >
              How would you describe your current support system?
            </label>

            <RadioButtonGroup
              register={register}
              options={supportSystem}
              context="current-support"
              name="initialAssessment.support_system.current_support"
            />
          </div>

          <div className="flex flex-col w-full pb-6">
            <label
              className="block font-medium mb-4"
            >
              Are you currently seeing a mental health professional?
            </label>

            <RadioButtonGroup
              register={register}
              options={standardRadioOptions}
              context="professional-care"
              name="initialAssessment.support_system.in_professional_care"
            />
          </div>

          <div className="flex flex-col w-full pb-6">
            <label
              className="block font-medium mb-4"
            >
              Are you currently taking any psychiatric medications?
            </label>

            <RadioButtonGroup
              register={register}
              options={standardRadioOptions}
              context="on-medication"
              name="initialAssessment.support_system.on_medication"
            />
          </div>

          <div className="flex flex-col w-full p-4 border-1 bg-(--color-light) text-(--color-dark) rounded-xl">
             <h3 className="text-lg font-semibold border-b border-b-(--color-dark)/50 pb-2">
            Safety Check
          </h3>
            <label
              className="block font-medium my-4"
            >
              Are you currently having thoughts of harming yourself or others?
            </label>

            <RadioButtonGroup
              register={register}
              options={safetyRadioOptions}
              context="harmful-thoughts"
              name="initialAssessment.support_system.harmful_thoughts"
            />
          </div>
        </section>
      </div>
    </>
  );
};
