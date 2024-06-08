type ButtonProps = {className?:string,big?:boolean,outline?:boolean,children?:React.ReactNode,onClick?:React.MouseEventHandler<HTMLButtonElement>}
export default function Button(props:ButtonProps)
{
    return(
        <button onClick={props.onClick} className={`${props.big?"p-4 text-sm rounded-xl":"px-4 py-2 rounded-full text-xs"} font-bold ${props.outline?"border-light/50 border hover:bg-light/10":"bg-accent "} hover:brightness-90 active:scale-95 transition-all duration-300 ${props.className}`}>{props.children}</button>
    )
}