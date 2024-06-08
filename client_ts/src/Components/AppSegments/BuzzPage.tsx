import { useEffect, useState } from 'react';
import SinglePost from '../Common/Post/SinglePost';
import {BuzzComment, BuzzCommentType} from '../Common/Comments';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { PostType } from '../Common/Post/Post';

export default function BuzzPage()
{
    const auth = useAuth();
    const {id} = useParams();
    const [bodyText,setBodyText] = useState("");
    const [data,setData] = useState<PostType>()
    const [commentsData,setCommentsData] = useState<BuzzCommentType[]>([]);

    useEffect(()=>{
        getBuzz();
        getComments();
    },[id]);
    
    async function postComment(e:React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        let response = await auth?.APIFunctions.PostRequest(`/comments?modelId=${id}&modelType=Buzz`,{content:bodyText},true);
        if(response.status == 201)
        {
            setBodyText("");
            getComments();
        }
    }

    async function getBuzz()
    {
        let response = await auth?.APIFunctions.GetRequest(`/buzz/${id}`,auth.isAuthorized);
        if(response?.status == 200)
        {
            setData(response.data.data);
            if(response.data.data.comments)
            {
                setCommentsData(response.data.data.comments);
            }
        }
        else
        {
            setData(null);
        }
    }
    async function getComments()
    {
        console.log("Not Implemented");
    }

    return(
        <div className='overflow-y-auto overflow-x-hidden h-full'>
            <SinglePost  isSinglePost data={data}>
                <div className=''>
                    {/* <hr className='border border-light/10' /> */}
                    <form onSubmit={postComment} className='flex'>
                        <input value={bodyText} onChange={e=>{setBodyText(e.target.value);}} placeholder="Post a Comment" className='w-full bg-darker overflow-hidden p-4 outline-none resize-none focus:border-b-accent border-b-light/10 border-b-2 transition-colors duration-500 rounded-tl-lg'></input>
                        <button className='bg-accent px-4 py-2 rounded-e-lg font-black hover:brightness-95 active:scale-95 transition-transform duration-300 flex items-center'><span className="material-icons">send</span></button>
                    </form>
                </div>    
                {
                    commentsData?.map((value,index)=>{
                        return <BuzzComment key={index} commentData={value}/>
                    })
                }
            </SinglePost>
        </div>
    )
}