import Button from './Button'
import { Link } from "react-router-dom";

export default function NotFound404(props)
{    
    return(
        <div className='mid-part flex flex-col overflow-scroll'>            
            <div className="card grow flex flex-col items-center justify-center">
                <h1 className='text-7xl md:text-9xl font-black'>404</h1>
                <h1 className='text-xl md:text-2xl font-bold'>PAGE NOT FOUND</h1>
                <Link to="/"><Button big='true'>GO HOME</Button></Link>
            </div>
        </div>
    )
}