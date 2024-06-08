import React, { useState , useContext, useEffect} from "react";
import axios from '../axios';
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

type UserdataType = {
    token:string,
    username:string,
    name:string,
} | null;

type AuthContextType = {
    userdata:UserdataType,
    isAuthorized:boolean,
    isValidated:boolean,
    APIFunctions:
    {
        SignIn:(email:string,password:string)=>Promise<boolean>,
        SignUp:(email:string,password:string,name:string,username:string)=>Promise<boolean>,
        SignOut:()=>void,
        PostRequest:(url:string,body:any,needsToken:boolean,params?:any)=>Promise<any>,
        GetRequest:(url:string,needsToken:boolean,params?:any)=>Promise<any>
    }
}

type AuthResponseType = {
    status:number,
    [key:string]:any
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function useAuth()
{
    return useContext(AuthContext);
}

export function AuthProvier(props:{children:React.ReactNode})
{
    const toast = useToast();
    const reactNavigator = useNavigate();
    const [isAuthorized,setIsAuthorized] = useState(false);
    const [isValidated,setIsValidated] = useState(false);
    const [userdata,setUserdata] = useState<UserdataType>({name:"AuthName",token:"ASDQSC",username:"autho"});
    
    useEffect(()=>{
        ValidateUser();
    },[])

    const APIFunctions = {
        SignIn,
        SignUp,
        SignOut,
        PostRequest,
        GetRequest
    };

    const value = {
        userdata,
        isAuthorized,//is signed in
        isValidated,//is validated from backend /home?
        APIFunctions
    }

    return  <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>

    async function SignIn(email:string,password:string):Promise<boolean>
    {
        try
        {
            const response:AuthResponseType = await PostRequest("/signin",{email,password},false);
            if(response.statusText == 'OK')
            {
                setUserdata(response.data.data);
                setIsAuthorized(true);
                localStorage.setItem("userdata",JSON.stringify(response.data.data));
                reactNavigator('/');
                toast?.CreateToast({body:"Welcome to Buzzup",mode:"Success",title:"Sign In Successful"});
                return true;
            }
        }
        catch(e)
        {
            console.log(e);
            return false;
        }
        return false;
    }
    // Auth Functions
    async function SignUp(email:string,password:string,name:string,username:string):Promise<boolean>
    {
        try
        {
            const response:AuthResponseType = await PostRequest("/signup",{email,password,username,name},false);
            if(response.statusText == 'Created')
            {
                reactNavigator('/signin');
                toast?.CreateToast({body:"Please sign in to you account.",mode:"Success",title:"Sign Up Successful"});
                return true;
            }
        }
        catch(e)
        {
            console.log(e);
            return false;
        }
        return false;
    }
    async function SignOut()
    {
        setUserdata(null);
        setIsAuthorized(false);
        localStorage.removeItem("userdata");
        toast?.CreateToast({body:"Visit again soon.",mode:"Success",title:"Sign out Successful"});
    }
    async function GetRequest(url:string,sendToken:boolean,params?:any)
    {
        let response:AuthResponseType;
        try
        {
            if(sendToken)
            {
                response = await axios.get(url,{headers:{"x-access-token":userdata?.token},params:params})
            }
            else
            {
                response = await axios.get(url,{params:params});
            }
        }
        catch(e:any)
        {
            return HandleErrors(e);
        }
        return response;
    }
    async function PostRequest(url:string,body:any,needsToken:boolean,params?:any)
    {
        let response:AuthResponseType;

        try
        {
            if(needsToken && isAuthorized)
            {
                response = await axios.post(url,body,{headers:{"x-access-token":userdata?.token},params:params});
            }
            else
            {
                response = await axios.post(url,body,{params:params});
            }   
        }
        catch(e:any)
        {
            return HandleErrors(e);
        }
        return response;
    }

    // Validation
    async function ValidateUser()//home route
    {
        const data = JSON.parse(localStorage.getItem("userdata") || '{}');

        if(Object.keys(data).length === 0){
            setIsValidated(true);
            return;
        }

        // await new Promise((resolve)=>{setTimeout(() => {
        //     resolve("ASD");
        // }, 1000);})

        function failed()
        {
            setUserdata(null);
            setIsAuthorized(false);
            localStorage.removeItem("userdata");
            setIsValidated(true);
        }
        try
        {
            if(data)
            {
                let response:AuthResponseType = await axios.get("/home",{headers:{"x-access-token":data?.token}})
                if(response.statusText=='OK')
                {
                    setUserdata(data);
                    setIsAuthorized(true);
                    setIsValidated(true);
                    return;
                }
                failed();
            }
            failed();
        }
        catch(e)
        {
            HandleErrors(e);
            failed();
        }
    }

    function HandleErrors(e:any):AuthResponseType
    {
        if(e?.response?.status == 400)
        {
            SignOut();
            toast?.CreateToast({body:"You've been signed out",mode:"Error",title:"Sign In Expired"});
        }
        else if(e?.response?.status == 403)
        {
            toast?.CreateToast({body:"You will need to sign in or create an account",mode:"Warning",title:"You are not Signed In"});
        }
        else if(e?.code == "ERR_NETWORK")
        {
            toast?.CreateToast({body:"Kushagra ka server ni chalra",mode:"Error",title:"Unable to connect to server"});
        }
        else if(e?.code == "ECONNABORTED")
        {
            toast?.CreateToast({body:"The connection to the server timed out",mode:"Success",title:"Connect Timed Out"});
        }
        else
        {
            console.log(e);
            toast?.CreateToast({body:e.response.statusText,mode:"Error",title:"An error Occurred"})
        }
        return e.response;
    }

}
