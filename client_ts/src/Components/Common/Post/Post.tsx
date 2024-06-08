import { useNavigate } from 'react-router-dom';
// import yoda from '../../assets/yoda.jpg';
import monke from '../../../assets/sonymonke.jpg';
import Shimmer from '../Shimmer';
import User from '../User';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Contexts/AuthContext';

type PlayerType = {isPlaying:boolean,index:number,setPlaying:(index:number)=>void};
export type PostType = {username:string,name:string,id:string,userId:string,title:string,content:string,createdAt:string,totalLikes:number,totalComments:number,isLiked:boolean|null} | null | undefined
type PropsType = {player:PlayerType,innerRef?:(node:HTMLDivElement)=>void,data?:PostType,children?:React.ReactNode,isSinglePost?:boolean};
export default function Post(props:PropsType)
{
    const auth = useAuth();
    const [data,setData] = useState<PostType>();
    const [isVisible,setIsVisible] = useState<boolean>(true);
    const currRef = useRef<HTMLDivElement>(null);//TODO optimization

    const [isPaused,setIsPaused] = useState(true);

    const observer = useRef<IntersectionObserver>();

    useEffect(()=>{
        if(props.data)
            setData(props.data);
    },[props.data])

    const reactNavigator = useNavigate();
    
    function commentClicked()
    {
        reactNavigator(`/buzz/${data?.id}`)
    }

    async function likeToggle()
    {
        if(!data)return;

        //API Call
        let response = await auth?.APIFunctions.PostRequest(`/likes/toggle?modelId=${data.id}&modelType=Buzz`,{userId:props.data?.id},true);
        console.log(response);
        if(response.status == 201)
        {
            let isLiked = !data?.isLiked;
            let totalLikes = data?.totalLikes + (isLiked?1:-1);
            setData({...data,totalLikes:totalLikes,isLiked:isLiked});
        }
    }

    useEffect(()=>{
        setIsPaused(!props.player.isPlaying);
    },[props.player.isPlaying]);

    async function playSound()
    {
        setIsPaused(prev=>!prev);
        props.player.setPlaying(props.player.index);
        if(!observer.current)
        {
            setIsPaused(false);
            observer.current = new IntersectionObserver((entries)=>{
                setIsVisible(entries[0].isIntersecting); 
            })
            if(currRef.current)observer.current.observe(currRef.current);
        }
    }
    
    if(!data)return <Shimmer shimmerType='card'></Shimmer>
    return(
        <>
            <div className='card' ref={props.innerRef}>
                <h1 className='font-bold text-xl mt-4'>{props.player.isPlaying}</h1>
                <User data={{name:data.name,username:data.username}}></User>
                <h1 className='font-bold text-xl mt-4'>{data.title}</h1>
                <p className='text-light/75'>{data.content}</p>
                <img className='w-full max-h-[30rem] object-contain mt-4 rounded-xl' src={monke} alt="" />
                <p className='pt-4 text-xs text-light/50'>{data.createdAt}</p>
                <hr className='mt-4 border border-light/10' />
                <div className='relative mt-4 flex justify-between'>
                    <button onClick={playSound} className='flex items-center transition-all active:scale-90'>
                        <div className='bg-accent p-1 h-8 w-8 rounded-full'>
                            <span className="material-icons">{!isPaused?"pause":"play_arrow"}</span>
                        </div>
                    </button>
                    <button onClick={likeToggle} className='flex items-center transition-all active:scale-90'>
                        <span className={`material-icons ${data.isLiked?"text-liked":""}`}>{data.isLiked?"favorite":"favorite_border"}</span>
                        <h1 className='font-bold text-xs ml-2'>{data.totalLikes}</h1>
                    </button>
                    {(!props.isSinglePost)?(
                    <button onClick={commentClicked} className='flex items-center hover:text-accent transition-all active:scale-90'>
                        <span className="material-icons">comment</span>
                        <h1 className='font-bold text-xs ml-2'>{data.totalComments}</h1>
                    </button>
                    ):("")}
                    <button className='flex items-center relative hover:text-accent transition-all active:scale-90'>
                        <span className="material-icons">share</span>
                    </button>
                </div>
                <div className='bg-red-500' ref={currRef}/>
                <div className={`${props.player.isPlaying?"h-16":"h-0"} transition-all duration-500`}/>
                {props.children}
            </div>
            <div className={`${props.player.isPlaying?(isVisible?"p-4 border-white/0 -mt-20 m-4 h-16":"shadow-lg card -mt-20 h-16"):"h-0"} bg-dark transition-all duration-500 sticky bottom-0 top-0 z-10 overflow-hidden flex justify-between`}>
                <button onClick={playSound} className='flex items-center transition-all active:scale-90'>
                    <div className={`${isVisible?"w-0 scale-0":"p-1 w-8 mr-4"} origin-left transition-all duration-500 bg-accent h-8 rounded-full`}>
                        <span className={`material-icons ${isVisible?"scale-0":"scale-100"} origin-left transition-all duration-500`}>{!isPaused?"pause":"play_arrow"}</span>
                    </div>
                </button>
                <div className="bg-accent/50 grow rounded-full overflow-clip">
                    <div style={{transform:`scaleX(${.5})`}} className="origin-left transition-transform duration-500 bg-accent grow h-full w-full" />
                </div>
            </div>
        </>
    )
}