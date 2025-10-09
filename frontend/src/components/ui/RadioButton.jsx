export const RadioButtonGroup = ({name, register, options, context}) => {
    return (
        <>
        <div className="grid grid-cols-1 gap-3">
        {options.map((option) => {
            return (
        <div key={`container-${option.value}`} className="flex items-baseline gap-2">
          <input
          key={`${context}-${option.value}`}
          id={`${context}-option-${option.value}`}
            {...register(name, {
              required: false,
            })}
            type="radio"
            value={option.value}
          />
          <label key={`label-${option.value}`} htmlFor={`${context}-option-${option.value}`}>{option.label}</label>
        </div>
            )

        })}
        </div>
        </>
    )
}