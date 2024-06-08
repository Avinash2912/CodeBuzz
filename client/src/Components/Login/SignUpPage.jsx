import logo from '../../assets/Logo/LogoNavbar.png';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { Link, Navigate } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../../axios';

export default function SignUpPage()
{
    let reactNavigator = useNavigate();

    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");


    async function submitForm(e)
    {
        e.preventDefault();
        try
        {
            const response = await axios.post("/signup",{email,password,username,name})
            if(response.statusText == 'Created')
            {
                alert("Account Created");
                reactNavigator('/signin');
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }


    return(
        <div className="w-full h-full flex justify-between">
            <div className="pattern grow rounded-r-3xl hidden md:block">
                
            </div>
            <div className="card flex flex-col justify-between p-5 md:p-10 w-full md:w-3/5 lg:w-2/5">
                <div className=''>
                    <img src={logo} className='w-24' alt="" />
                    <h1 className='mt-8 font-black text-4xl'>SIGN UP</h1>
                    <form onSubmit={submitForm} action='' className="pt-8 gap-8 form flex-col flex">
                        <FormInput value={email} onChange={(e)=>setEmail(e.target.value)} id='email' type='text' autoComplete="off" label='Email Address'/>
                        <div className='flex gap-4'>
                            <FormInput className='grow' value={username} onChange={(e)=>setUsername(e.target.value)} id='username' type='text' autoComplete="off" label='Username'/>
                            <FormInput className='grow' value={name} onChange={(e)=>setName(e.target.value)} id='name' type='text' autoComplete="off" label='Account Name'/>
                        </div>
                        <FormInput className='' value={password} onChange={(e)=>setPassword(e.target.value)} id='password' type='password' label='Password'/>
                        <FormButton className=''>SIGN UP</FormButton>
                    </form>
                    <p className='text-light/50 text-xs mt-5 md:mt-0 md:text-base flex justify-center'>Already Have an Account? <Link to='/signin' className='ml-1 text-accent/50'>Sign In Here</Link></p>
                </div>
                <div>
                    FOOTER
                </div>
            </div>
        </div>
    )
}