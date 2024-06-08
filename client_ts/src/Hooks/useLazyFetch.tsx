import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";

export default function useLazyFetch<T>(route:string,pageNumber:number,maxPage?:number)
{
    const auth = useAuth();
    const pageSize = 5;
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [data,setData] = useState<T[]>([]);
    const [hasMore,setHasMore] = useState(false);
    
    useEffect(()=>{
        setData([]);
    },[route])

    useEffect(()=>{
        if(maxPage !=undefined && pageNumber > maxPage)
        {
            setHasMore(false);
            return;
        }
        setLoading(true);
        setError(false);
        auth?.APIFunctions.GetRequest(route,auth.isAuthorized,{start:pageSize*pageNumber,limit:pageSize}).then(res=>{
            setData(prevous=>[...prevous,...res.data.data])
            setHasMore(res.data.data.length > 0);
            setLoading(false);
        }).catch(()=>{
            setError(true);
        })
    },[route,pageNumber]);

    type useLazyFetchType = {loading:boolean,error:boolean,data:T[],hasMore:boolean};
    let result:useLazyFetchType = { loading , error , data , hasMore};
    return result;    
}