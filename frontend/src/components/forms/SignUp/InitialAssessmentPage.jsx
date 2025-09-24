import { Checkbox } from "../../ui/Checkbox";

export const InitialAssessmentPage = ({register, getValues}) => {
    return (
        <>
        <div className="space-y-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-(--color-light) mb-2">Initial Assessment</h2>
                    <p className="text-(--color-light)">
                        This information helps us personalize your experience. All questions are optional, 
                        and you can skip anything you're not comfortable sharing.
                    </p>
                </div>
            
                <section className="space-y-6">
                    <h3 className="text-lg font-semibold border-b-amber-500/70  pb-2">
                        Current Concerns
                    </h3>
                </section>
        </div>
        </>
    )
}