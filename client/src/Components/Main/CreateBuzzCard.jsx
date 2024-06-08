import User from './User';
import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { useAuth } from '../../Contexts/AuthContext';
import axios from '../../axios';

export default function CreateBuzzCard(props)
{    
    const auth = useAuth();
    const textareaRef = useRef(null);
    let [bodyText,setBodyText] = useState("");
    let [titleText,setTitleText] = useState("");

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [bodyText]);


    async function postBuzz()
    {
        try
        {
            let response = await axios.post('/createbuzz',{title:titleText,content:bodyText},{headers:{"x-access-token":auth.userdata.token}})
            if(response.statusText == 'Created')
            {
                alert("Your Buzz has been created");//TODO TOAST
            }
            setBodyText("");
            setTitleText("");
        }
        catch(e)
        {
            console.log(e);
        }
    }

    return (
        <div className={`${props.className}`}>
            <User className=''></User>
            <input value={titleText} onChange={(e)=>{setTitleText(e.target.value);}}  placeholder="Enter Title" className='mt-4 font-bold text-xl w-full bg-dark overflow-hidden px-4 outline-none' type="text" name="" id="" />
            <textarea ref={textareaRef} value={bodyText} onChange={e=>{setBodyText(e.target.value);}} rows="1" placeholder="Enter Description"
            className='my-4 text-sm w-full bg-dark overflow-hidden px-4 outline-none resize-none' ></textarea>
        
            <hr className='-mt-2 border border-light/10'/>
            <div className='mt-4 flex justify-between flex-wrap gap-4 md:gap-0 md:flex-nowrap'>
                <input type="file" className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:text-sm file:border-2 file:bg-dark file file:border-accent file:text-accent"/>
                <Button onClick={postBuzz}>BUZZ</Button>
            </div>
        </div>
    )
}