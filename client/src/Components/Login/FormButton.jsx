export default function FormButton(props)
{
    return(
        <>
        <button className={`${props.className} m-2 p-4 bg-accent font-bold rounded-lg
        hover:brightness-95 active:scale-95 transition-transform duration-300
        `}>
            {props.children}
        </button>
        </>
    )
}