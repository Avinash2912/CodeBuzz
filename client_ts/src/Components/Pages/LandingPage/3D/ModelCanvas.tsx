import { Canvas } from '@react-three/fiber';
import Bee from './Bee';
import { useRef } from 'react';

export default function ModelCanvas(props:{className?:string})
{
    const ref = useRef<HTMLDivElement>(null)
    return(
        <div ref={ref} className={`${props.className} z-0 md:h-96 md:w-96`}>
            <Canvas camera={{fov:35,position:[0,0,6]}}>
                <Bee CanvasRef={ref}/>
            </Canvas>
        </div>
    )
}