import React, { useContext, useEffect, useRef, useState } from "react";
import { ImCross , ImCheckmark } from 'react-icons/im';
import { AiFillInfoCircle , AiFillWarning } from 'react-icons/ai';

type ToastContextType = {
    CreateToast:(data:ToastType)=>void
}
const ToastContext = React.createContext<ToastContextType | null>(null);

export function useToast()
{
    return useContext(ToastContext);
}

type ToastType = {
    mode:"Success" | "Error" | "Warning" | "Info",
    title:string,
    body:string
}
type ToastPropsType = {
    data:ToastType,
    DestroyToast:(index:number)=>void,
    index:number
}
function Toast(props:ToastPropsType)
{
    const [hidden,setHidden] = useState<boolean>(true);
    const [willDestroy,setWillDestroy] = useState(false);
    useEffect(()=>{
        setTimeout(() => {
            setHidden(false);
            setTimeout(() => {
                Destroy();
            }, 5000);
        }, 20);
    },[])

    function Destroy()
    {
        if(willDestroy)return;
        setWillDestroy(true);
        setHidden(true);
        setTimeout(() => {
            props.DestroyToast(props.index);
        }, 1000);
    }

    let colorMain:string;
    let colorIcon:string;

    if(props.data.mode == "Error"){colorMain = 'bg-red-500';colorIcon = 'bg-red-700';}
    else if(props.data.mode == "Success"){colorMain = 'bg-green-500';colorIcon = 'bg-green-700';}
    else if(props.data.mode == "Warning"){colorMain = 'bg-accent';colorIcon = 'bg-yellow-700';}
    else{colorMain = 'bg-dark';colorIcon = 'bg-darker';}

    return(
        <div className={`w-80 relative ${colorMain} ${hidden?"max-h-0 opacity-0 translate-x-full":"max-h-32 card"} transition-all duration-700 flex items-center gap-4`}>
            <div onClick={Destroy} className="absolute right-0 top-0 p-4 opacity-50 hover:opacity-100 transition-opacity"><ImCross size='16'/></div>
            <div className="">
                <div className={`${colorIcon} rounded-full w-16 h-16 flex items-center justify-center font-black text-3xl`}>
                    {
                        (()=>{
                            if(props.data.mode == "Error") return <ImCross/>;
                            else if(props.data.mode == "Success") return <ImCheckmark/>
                            else if(props.data.mode == "Warning") return <AiFillWarning/>
                            else return <AiFillInfoCircle/>
                        })()
                    }
                </div>
            </div>
            <div className="grow">
                <h1 className="text-lg font-semibold">{props.data.title}</h1>
                <div className="text-xs opacity-70 mt-1">
                    <p>{props.data.body}</p>
                    {/* <p>{props.index}</p> */}
                </div>
            </div>
        </div>
    )
}

export function ToastProvier(props:{children:React.ReactNode})
{   
    const [toastArray,setToastArray] = useState<JSX.Element[]>([]);
    let toastCounter = useRef(0);

    async function CreateToast(data:ToastType)
    {
        setToastArray((prev)=>{
            toastCounter.current++;
            return [...prev,<Toast key={toastCounter.current-1} index={toastCounter.current-1} data={data} DestroyToast={DestroyToast}/>]
        })
    }
    async function DestroyToast(index:number)
    {
        return setToastArray((prev)=>{
            let toFind = prev.findIndex((curr)=>{
                return curr.props.index == index;
            })
            prev.splice(toFind,1);
            return prev;
        })
    }

    const value:ToastContextType = {
        CreateToast,
    }

    return  <ToastContext.Provider value={value}>
        <div className="absolute z-50 right-0 bottom-0 flex flex-col-reverse overflow-hidden">
            {toastArray}
        </div>
        {props.children}
    </ToastContext.Provider>
}
