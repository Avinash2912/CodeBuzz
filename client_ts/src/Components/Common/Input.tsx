type ButtonProps = {
    className?:string,
    label?:string,
    type?:React.HTMLInputTypeAttribute,
    id?:string,
    value?:string,
    onChange?:React.ChangeEventHandler<HTMLInputElement>
}
export default function Input(props:ButtonProps)
{
    if(props.type=='file')
    {
        return(
            <div className="flex flex-col gap-4">
                <h1 className={`text-lg font-bold ${props.label?"":"hidden"}`}>{props.label}</h1>
                <input type="file" className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm file:border-2 file:bg-dark file file:border-accent file:text-accent"/>
            </div>
        )
    }
    return(
        <div className={props.className}>
        {/* <h2 className="text-light/75 mb-2">{props.label}</h2> */}
        <input type={`${props.type}`} id={props.id} placeholder={props.label} value={props.value} onChange={props.onChange} className={`w-full p-4 text-sm bg-darker rounded-t-lg text-light/75 outline-none focus:border-b-accent border-b-light/10 border-b-2 transition-all duration-500`}/>
        </div>    
    )
}