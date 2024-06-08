import { useRef } from "react";
import useMousePosition from "../../../Hooks/useMousePosition";

export default function Cursor()
{
    const ref = useRef<HTMLDivElement>(null);
    useMousePosition(ref);
    // const mousePosition = useMousePosition();
    return(
        <div ref={ref} className='hidden md:block rounded-full accent-gradient -z-50 cursor bg-white h-[500px] aspect-square fixed'/>
    )
}