export const Checkbox = ({id, name, label, register}) => {
    return (
        <>
        {/* <div className="flex flex-col gap-1"> */}
        <div className="flex items-baseline gap-2">
          <input
          id={id}
            {...register(name, {
              required: false,
            })}
            type="checkbox"
          />
          <label htmlFor={id}>{label}</label>
        </div>
        {/* </div> */}
        </>
    )
}