import User from './User';
import yoda from '../../assets/yoda.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useAuth } from '../../Contexts/AuthContext';

export default function Post({data,children,hideCommentButton})
{
    let auth = useAuth();
    const reactNavigator = useNavigate();
    
    const [pressedShare,setPressedShare] = useState(false);
    const [likeStatus,setLikeStatus] = useState({totalLikes:0,isLiked:false});

    useEffect(()=>
    {
        if(data)
            setLikeStatus({totalLikes:data.totalLikes,isLiked:data.isLiked});
    },[data])

    async function toggleLike()
    {
        try
        {
            // CASE FOR NOT AUTHORIZED TODO
            if(auth.isAuthorized)
            {
                let response = await axios.post(`/likes/toggle?modelId=${data.id}&modelType=Buzz`,
                {},
                {headers:{"x-access-token":auth.userdata.token}});
                console.log(response.data.data);
                let prev = likeStatus.totalLikes;
                setLikeStatus({totalLikes:prev+((response.data.data)?1:-1),isLiked:response.data.data})
                return;
            }
            alert("You are not Signed In");
        }
        catch(e)
        {
            console.log(e);
        }
    }
    function comment()
    {
        reactNavigator(`/buzz/${data.id}`)
    }
    function toggleShareWindow()
    {
        setPressedShare(!pressedShare);
    }

    // Dummy data if nothing is passed
    if(!data || Object.keys(data).length == 0)
    {
        return(
            <div className='card shimmer'>
                <div className='flex flex-col gap-4'>
                    <div className='flex gap-4 items-center'>
                        <div className='h-full'>
                            <div className='h-14 w-14 rounded-full bg-light/10'/>
                        </div>
                        <div className='h-full w-full flex flex-col gap-4'>
                            <div className='h-2 w-1/2 rounded-full bg-light/10'/>
                            <div className='h-2 w-1/4 rounded-full bg-light/10'/>
                        </div>
                    </div>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                </div>
            </div>
        )
    }

    return (
    <div className='card'>
        {/* <User className='mb-4' data={data.userId}></User> */}
        <h1>USER_ID : {data.userId}</h1>
        <img className='w-full max-h-[30rem] object-contain mb-4 rounded-xl' src={yoda} alt="" />
        <h1 className='font-bold text-xl'>{data.title}</h1>
        <p className='text-light/75'>{data.content}</p>
        <p className='pt-4 text-xs text-light/50'>{data.createdAt}</p>
        <hr className='mt-4 border border-light/10' />
        <div className='relative mt-4 flex justify-between md:px-20'>
            <button onClick={toggleLike} className='flex items-center transition-all active:scale-90'>
                <span className={`material-icons ${likeStatus.isLiked?"text-liked":""}`}>{likeStatus.isLiked?"favorite":"favorite_border"}</span>
                <h1 className='font-bold text-xs ml-2'>{likeStatus.totalLikes}</h1>
            </button>
            {(!hideCommentButton)?(
            <button onClick={comment} className='flex items-center hover:text-accent transition-all active:scale-90'>
                <span className="material-icons">comment</span>
                <h1 className='font-bold text-xs ml-2'>{data.totalComments}</h1>
            </button>
            ):("")}
            <button onClick={()=>{toggleShareWindow();}} className='flex items-center relative hover:text-accent transition-all active:scale-90'>
                <span className="material-icons">share</span>
            </button>
            <ul className={`${pressedShare?"max-h-36":"max-h-0 opacity-0"} duration-300 transition-all absolute bottom-8 flex flex-col justify-end right-0 overflow-clip rounded-lg bg-dark divide-y-2 divide-light/10 border-2 border-light/10`}>
                <li onClick={()=>{toggleShareWindow();navigator.clipboard.writeText(`http://localhost:5173/buzz/${data.id}`)}} className='p-4 flex items-center gap-2 cursor-pointer transition-colors hover:bg-accent'><span className="material-icons">link</span>Copy Link</li>
                <li className='opacity-30 cursor-not-allowed p-4 flex items-center gap-2'><span className="material-icons">ios_share</span>Share</li>
            </ul>
            {/* replace copy link TODO */}
        </div>
        {children}
    </div>
    )
}