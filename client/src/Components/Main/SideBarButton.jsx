export default function SideBarButton({icon,label,className})
{
    return(
        <button className={`flex items-center w-full p-4 font-bold
        relative after:absolute after:h-full after:rounded-r-full after:w-0 after:top-0 after:left-0 after:bg-accent
        hover:after:w-full after:transition-all after:duration-300 ${className}
        `}>
            <span className="z-10 material-icons text-sm md:text-xl md:mr-4">{icon}</span>
            <h1 className="z-10 hidden md:block">{label}</h1>
        </button>
    )
}