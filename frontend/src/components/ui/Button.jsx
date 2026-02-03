export const Button = ({text, onClick, type, autoFocus, disabled = false}) => {
    return (
        <>
            <button onClick={onClick} type={type} autoFocus={autoFocus} disabled={disabled} className="px-2.5 py-1 rounded-xl glass-effect3 text-(--color-dark) white-shadow font-medium text-lg cursor-pointer duration-300 border-(--color-light) border-[1px]">{text}</button>
        </>
    )
}