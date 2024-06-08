import { useState } from 'react';
import User from './User';
import Shimmer from './Shimmer';
import { useAuth } from '../../Contexts/AuthContext';

export function ReplyComment()
{
    return <Shimmer shimmerType='replycomment'></Shimmer>
    return(
        <div className='flex items-center'>
            <span className="material-icons -scale-x-100 opacity-50">
            keyboard_return
            </span>
            <div className='ml-8'>
                <User small className='mt-4'></User>
                <p className='text-light/75 text-sm mt-2'>This is a reply</p>
                <p className='text-xs text-light/50'>26/12/23</p>
            </div>
        </div>
    )
}

export type BuzzCommentType = {
    _id:string,
    userId:string,
    content:string,
    createdAt:string,
    totalLikes:number,
    totalReplies:number,
    isLiked:boolean|null
} | null | undefined;

export function BuzzComment({children,commentData}:{children?:React.ReactNode,commentData?:BuzzCommentType})
{  
    const auth = useAuth();
    let [bodyText,setBodyText] = useState("");
    let [replyMode,setReplyMode] = useState(false);

    function toggleReplyMode()
    {
        setReplyMode(!replyMode);
    }

    async function postReply(e:React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        console.log(commentData?._id);
        let response = await auth?.APIFunctions.PostRequest(`/comments?modelId=${commentData?._id}&modelType=Comment`,{content:bodyText},true);
        console.log(response);

        toggleReplyMode();
    }

    if(!commentData)
        return <Shimmer shimmerType='buzzcomment'></Shimmer>

    return(
        <div className='mt-4'>
            <hr className='border border-light/10' />
            <User data={{name:commentData?.userId,username:commentData?.userId}} small className='mt-4'></User>
            <p className='text-light/75 text-sm mt-2'>{commentData?.content}</p>
            <p className='text-xs text-light/50'>{commentData?.createdAt}</p>
            {children}
            <h1 onClick={toggleReplyMode} className={`mt-4 cursor-pointer hover:text-accent transition-all ${(!replyMode)?"max-h-16":"max-h-0 opacity-0 pointer-events-none"}`}>Reply</h1>
            <form onSubmit={postReply} className={`flex transition-all ${(replyMode)?"mt-4 max-h-16":"max-h-0 opacity-0 pointer-events-none"}`}>
                <input value={bodyText} onChange={e=>{setBodyText(e.target.value);}} placeholder="Post a Reply" className='w-full bg-darker overflow-hidden p-4 outline-none resize-none focus:border-b-accent border-b-light/10 border-b-2 transition-colors rounded-tl-lg'></input>
                <button className='bg-accent px-4 py-2 rounded-e-lg font-black hover:brightness-95 active:scale-95 transition-transform duration-300 flex items-center'><span className="material-icons">send</span></button>
            </form>
        </div>
    )
}