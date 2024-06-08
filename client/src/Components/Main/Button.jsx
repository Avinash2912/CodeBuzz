export default function Button(props)
{
    return(
        <button {...props} className={`${props.className} ${props.big?"p-4 rounded-xl":"px-4 py-2 rounded-full text-xs"} font-bold ${props.outline?"border-light/50 border hover:bg-light/10":"bg-accent "} hover:brightness-90 active:scale-95 transition-all duration-300`}>{props.children}</button>
    )
}