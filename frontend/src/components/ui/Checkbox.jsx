export const Checkbox = ({id, name, label, register, value}) => {
    return (
        <>
        <div className="flex items-baseline gap-2">
          <input
          id={id}
            {...register(name, {
              required: false,
            })}
            type="checkbox"
            value={value}
          />
          <label htmlFor={id}>{label}</label>
        </div>
        </>
    )
}