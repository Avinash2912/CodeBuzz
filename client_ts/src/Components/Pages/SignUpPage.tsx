import { useState } from "react";
import logo from '../../assets/Logo/LogoNavbar.png';
import { Link } from "react-router-dom";
import Button from "../Common/Button";
import Input from "../Common/Input";
import { useAuth } from "../../Contexts/AuthContext";

import { BsGoogle } from 'react-icons/bs';
import { AiFillAlipayCircle } from 'react-icons/ai'

export default function SignUpPage()
{
    const auth = useAuth();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");

    async function submitForm(e:React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        
        console.log(await auth?.APIFunctions.SignUp(email,password,name,username));
    }

    return(
        <div className="w-screen h-screen flex justify-between">
            <div className="pattern grow rounded-r-3xl hidden md:flex flex-col justify-center items-center">
                <h1 className="text-5xl lg:text-7xl font-black">BUZZUP.</h1>
                <h1 className="text-lg font-bold opacity-70">LET'S BUZZ</h1>
            </div>
            <div className="card overflow-y-auto flex flex-col justify-between p-5 md:p-10 w-full md:w-3/5 lg:w-2/5">
                <Link to='/landing'><img src={logo} className='w-24' alt="" /></Link>
                <div className="flex flex-col gap-4">
                    <form onSubmit={submitForm} action=''>
                        <h1 className='font-black text-4xl mb-10'>SIGN UP</h1>
                        <div className="flex flex-col gap-2">
                            <Input value={email} onChange={(e)=>setEmail(e.target.value)} type='text' label='Email Address'/>
                            <div className="flex flex-wrap gap-2">
                                <Input className="grow" value={username} onChange={(e)=>setUsername(e.target.value)} type='text' label='Username'/>
                                <Input className="grow" value={name} onChange={(e)=>setName(e.target.value)} type='text' label='Display Name'/>
                            </div>
                            <Input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' label='Password'/>     
                        </div>
                        <Button big className='mt-10 w-full'>SIGN UP</Button>
                        <p className='text-light/50 text-xs mt-5 md:mt-3 md:text-base flex justify-center'>Already Have an Account? <Link to='/signin' className='ml-1 text-accent/50'>Sign In Here</Link></p>
                    </form>
                    <hr className='border border-light/10' />
                    <div className="flex gap-4">
                        <Button className="flex-grow bg-blue-500 flex items-center justify-center gap-4" big> <BsGoogle size={18}/> <div><span className="hidden md:inline">SIGN IN WITH</span> GOOGLE</div></Button>
                        <Button className="flex-grow bg-slate-500 flex items-center justify-center gap-4" big> <AiFillAlipayCircle size={24}/> <div><span className="hidden md:inline">SIGN IN WITH</span> KUSHGOYAL</div></Button>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}