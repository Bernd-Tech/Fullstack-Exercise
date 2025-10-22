export const Button = ({text, onClick, type, autoFocus}) => {
    return (
        <>
            <button onClick={onClick} type={type} autoFocus={autoFocus} className="px-2.5 py-1 rounded-xl glass-effect3 text-(--color-dark) white-shadow font-medium text-lg hover:scale-[1.05] cursor-pointer duration-300 border-(--color-light) border-[1px]">{text}</button>
        </>
    )
}