import Post ,{PostType} from "./Post";
import useLazyFetch from "../../../Hooks/useLazyFetch";
import { useEffect, useState , useRef , useCallback} from "react";
import Shimmer from "../Shimmer";

type PostArrayProps = {route:string,children?:React.ReactNode,limit?:number}
export default function PostArray({route,children,limit}:PostArrayProps)
{
    const [pageNumber,setPageNumber] = useState(0);
    const lastObserver = useRef<IntersectionObserver>();
    const {data,error,hasMore,loading} = useLazyFetch<PostType>(route,pageNumber,limit);

    const lastElementRef = useCallback<(node:HTMLDivElement)=>void>((node)=>{
        // if(loading)return;
        if(lastObserver.current)lastObserver.current.disconnect();
        lastObserver.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && hasMore)
            {
                console.log('visible');
                setPageNumber(prevPage=>prevPage+1);
            }
        })
        if(node)lastObserver.current.observe(node);
    },[loading,hasMore]);
    // const lastElementRef = useCallback((node:any)=>{console.log(node)},[]);

    useEffect(()=>{
        setPageNumber(0);
    },[route])

    const [isPlaying,setIsPlaying] = useState<boolean[]>([]);

    function setPlaying(index:number)
    {
        let temp:boolean[] = [];
        for(let index = 0 ; index < data.length ; index++)
        {
            temp[index] = false;
        }
        temp[index] = true;
        setIsPlaying(temp);
    }

    return(
        <>
            <div>
                {data.map((val,index)=>{
                    if(data.length  === index + 1)
                    {
                        return <Post player={{index:index,isPlaying:isPlaying[index],setPlaying:setPlaying}} innerRef={lastElementRef} key={index} data={val}/>
                    }
                    return <Post player={{index:index,isPlaying:isPlaying[index],setPlaying:setPlaying}} key={index} data={val}/>
                })}
                {hasMore && (<><Shimmer shimmerType="card"/></>)}
                {error && "ERROR TODO"}
                {children}
            </div>
        </>
    )
}