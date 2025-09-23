export const Checkbox = ({id, name, label, errors, register}) => {
    return (
        <>
        <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <input
          id={id}
            {...register(name, {
              required: "This checkbox is required",
            })}
            type="checkbox"
          />
          <label htmlFor={id}>{label}</label>
        </div>
            {errors.consent?.crisisDisclaimer && (
                <p className="text-red-500 indent-5.5">{`errors.${name}.message`}</p>
            )}
        </div>
        </>
    )
}