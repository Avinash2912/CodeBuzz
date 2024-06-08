import { useEffect, useState } from 'react';
import yoda from '../../assets/yoda.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

type DataInput = {name:string | undefined,username:string | undefined,pfp?:string} | undefined | null;
type UserProps = {data?:DataInput,className?:string,children?:React.ReactNode,small?:boolean,static?:boolean};
export default function User(props:UserProps)
{
    const auth = useAuth();
    const reactNavigator = useNavigate();
    const [data,setData] = useState<DataInput>({username:auth?.userdata?.username || "DefaultUsername",name:auth?.userdata?.name || "DefaultName"});

    useEffect(()=>{
        if(props.data !== undefined)
        {
            setData(props.data);
        }
    },[props]);

    function clicked()
    {
        if(!props.static)
        reactNavigator(`/user/${data?.username}`);
    }

    return(
        <div onClick={clicked} className={`${props.className} items-center cursor-pointer flex`}>
            <img src={data?.pfp || yoda} className={`hover:scale-105 transition-transform object-cover w-14 h-14 bg-accent rounded-full mr-4 ${(props.small)?("w-7 h-7"):("")}`}></img>
            <div className='flex flex-col justify-center'>
                <h1 className={`font-bold hover:text-accent transition-colors duration-500 ${(props.small)?("text-sm"):("")}`}>{data?.name}</h1>
                <h2 className='text-light/50 text-xs hover:text-accent transition-colors duration-500'>@{data?.username}</h2>
            </div>
            {props.children}
        </div>
    )
}