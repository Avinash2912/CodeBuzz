import User from './User';
import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import { useAuth } from '../../Contexts/AuthContext';
import Input from './Input';
import { useToast } from '../../Contexts/ToastContext';

type CreateBuzzCardPropsType = {className?:string};
export default function CreateBuzzCard(props:CreateBuzzCardPropsType)
{    
    const toast = useToast();
    const auth = useAuth();
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    let [bodyText,setBodyText] = useState("");
    let [titleText,setTitleText] = useState("");

    useEffect(() => {
        if (textareaRef && textareaRef.current)
        {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = ((scrollHeight < 200)?scrollHeight:200) + "px";
        }
    }, [bodyText]);

    async function Buzz()
    {
        let response = await auth?.APIFunctions.PostRequest('/createbuzz',{title:titleText,content:bodyText},true);
        
        if(response.status == 201)
        {
            toast?.CreateToast({body:"Oye balle balle TODO CHANGE",mode:"Info",title:"Buzz Created"});
            setBodyText("");
            setTitleText("");
        }
    }

    return (
        <div className={`${props.className}`}>
            <User className=''></User>
            <input value={titleText} onChange={(e)=>{setTitleText(e.target.value);}}  placeholder="Enter Title" className='mt-4 font-bold text-xl w-full bg-dark overflow-hidden px-4 outline-none' type="text" name="" id="" />
            <textarea ref={textareaRef} value={bodyText} onChange={e=>{setBodyText(e.target.value);}} placeholder="Enter Description"
            className='my-4 text-sm w-full bg-dark overflow-auto px-4 outline-none resize-none' ></textarea>
        
            <hr className='-mt-2 border border-light/10'/>
            <div className='mt-4 flex justify-between flex-wrap gap-4 md:gap-0 md:flex-nowrap'>
                <Input type='file'/>
                <Button onClick={Buzz}>BUZZ</Button>
            </div>
        </div>
    )
}