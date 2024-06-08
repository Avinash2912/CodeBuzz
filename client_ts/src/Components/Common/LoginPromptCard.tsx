import { Link } from "react-router-dom";
import Button from "./Button";

export default function LoginPromptCard(props:{className?:string})
{
    return(
        <div className={`card ${props.className}`}>
            <h1 className='font-bold'>You are not Signed In</h1>
            <h1 className='text-light/50 mb-2'>Sign In to access all features of Buzzup.</h1>
            <div className='flex flex-col gap-4 p-4'>
                <Link to='/signin'><Button big className='w-full'>SIGN IN</Button></Link>
                <Link to='/signup'><Button big outline className='w-full'>SIGN UP</Button></Link>
            </div>
        </div>
    )
}