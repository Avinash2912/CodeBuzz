import { useState } from "react";
import logo from '../../assets/Logo/LogoNavbar.png';
import { Link } from "react-router-dom";
import Button from "../Common/Button";
import Input from "../Common/Input";
import { useAuth } from "../../Contexts/AuthContext";

export default function SignInPage()
{
    const auth = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function submitForm(e:React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        await auth?.APIFunctions.SignIn(email,password);
    }

    return(
        <div className="w-screen h-screen flex justify-between">
            <div className="pattern grow rounded-r-3xl hidden md:flex flex-col justify-center items-center">
                <h1 className="text-5xl lg:text-7xl font-black">BUZZUP.</h1>
                <h1 className="text-lg font-bold opacity-70">LET'S BUZZ</h1>
            </div>
            <div className="card overflow-y-auto flex flex-col justify-between p-5 md:p-10 w-full md:w-3/5 lg:w-2/5">
            <Link to='/landing'><img src={logo} className='w-24' alt="" /></Link>
                <form onSubmit={submitForm} action='' className="form flex-col flex">
                    <h1 className='font-black text-4xl mb-10'>SIGN IN</h1>
                    <div className="flex flex-col gap-4">
                        <Input value={email} onChange={(e)=>setEmail(e.target.value)} type='text' label='Email Address'/>
                        <Input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' label='Password'/>     
                    </div>
                    <Button big className='mt-10'>SIGN IN</Button>
                    <p className='text-light/50 text-xs mt-5 md:mt-3 md:text-base flex justify-center'>Don't Have an Account? <Link to='/signup' className='ml-1 text-accent/50'>Sign Up Here</Link></p>
                </form>
                <div>FOOTER</div>
            </div>
        </div>
    )
}