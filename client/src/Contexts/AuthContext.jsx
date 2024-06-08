import { createContext, useContext, useEffect , useLayoutEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from'../axios';

const AuthContext = createContext();

export function useAuth()
{
    return useContext(AuthContext);
}

export function AuthProvider(props)
{
    let reactNavigator = useNavigate();
    const [userdata,setUserdata] = useState(null);
    const [isAuthorized,setIsAuthorized] = useState(false);
    const [hasPerformedValidation,setHasPerformedValidation] = useState(false);

    useEffect(()=>{
        validateUser();
    },[])

    function signin(data)
    {
        setUserdata(data);
        setIsAuthorized(true);
        localStorage.setItem("userdata",JSON.stringify(data));
        reactNavigator('/');
    }
    function signout()
    {
        setUserdata(null);
        setIsAuthorized(false);
        localStorage.removeItem("userdata");
        window.location.reload();
    }
    async function validateUser()
    {
        await new Promise((resolve)=>{setTimeout(() => {
            resolve("ASD");
        }, 1000);})
        function failed()
        {
            setUserdata(null);
            setIsAuthorized(false);
            localStorage.removeItem("userdata");
            setHasPerformedValidation(true);
        }
        const data = JSON.parse(localStorage.getItem("userdata"));
        try
        {
            if(data)
            {
                let response = await axios.get("/home",{headers:{"x-access-token":data.token}})
                if(response.statusText=='OK')
                {
                    setUserdata(data);
                    setIsAuthorized(true);
                    setHasPerformedValidation(true);
                    return;
                }
                failed();
            }
            failed();
        }
        catch(e)
        {
            console.log(e);
            failed();
        }
    }


    const value = {
        isAuthorized,
        userdata,
        signin,
        signout,
        hasPerformedValidation
    }

    return(
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
    
}