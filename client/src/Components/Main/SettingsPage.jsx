import FormInput from '../Login/FormInput';
import { useState } from 'react';
export default function SettingsPage()
{
    const [email,setEmail] = useState("");
    return(
        <div className="mid-part">
            <div className={`h-full flex flex-col relative`}>
                <div className='p-4 flex justify-evenly bg-darker'>
                    <div className='text-accent'>EDIT PROFILE</div>
                    <div>|</div>
                    <div>SITE SETTINGS</div>
                </div>
                <div className="card">
                    <FormInput className='w-full' value={email} onChange={(e)=>setEmail(e.target.value)} id='email' type='text' label='Email Address'/>    
                </div>
            </div>
        </div>
    )
}