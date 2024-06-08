export default function Loading({active})
{
    return(
        <div className={`${active?"":"-translate-y-full"} transition-transform duration-1000 absolute w-screen h-screen flex justify-center items-center bg-darker z-50`}>
            <div className="loader"></div>
        </div>
    )
}