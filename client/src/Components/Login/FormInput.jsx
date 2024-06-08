export default function FormInput(props)
{
    return(
        <div className={props.className}>
        <h2 className="text-light/75 mb-4">{props.label}</h2>
        <input type={`${props.type}`} id={props.id} value={props.value} onChange={props.onChange}
        className={`w-full p-4 bg-darker rounded-t-lg text-light/75 outline-none
        focus:border-b-accent  border-b-light/10 border-b-2
        transition-all duration-500`}/>
        </div>
    )
}