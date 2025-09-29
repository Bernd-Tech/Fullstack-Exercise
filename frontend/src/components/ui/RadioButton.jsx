export const RadioButtonGroup = ({name, register, options}) => {
    return (
        <>
        {/* <div className="flex flex-col gap-1"> */}
        <div className="grid grid-cols-1 gap-3">
        {options.map((option) => {
            return (
        <div key={`container-${option.value}`} className="flex items-baseline gap-2">
          <input
          key={`duration-${option.value}`}
          id={`duration-option-${option.value}`}
            {...register(name, {
              required: false,
            })}
            type="radio"
            value={option.value}
          />
          <label key={`label-${option.value}`} htmlFor={`duration-option-${option.value}`}>{option.label}</label>
        </div>
            )

        })}
        </div>
        {/* </div> */}
        </>
    )
}