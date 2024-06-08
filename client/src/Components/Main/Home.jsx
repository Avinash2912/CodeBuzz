import Post from './Post';
import CreateBuzzCard from './CreateBuzzCard';
import { useEffect, useRef, useState } from 'react';

export default function Home()
{

    const data =
    {
        id:"DummyPostId",
        date:"15/07/23",
        text:"Yoda You caaan call me",
        hasLiked:true,
        likeCount:100,
        commentCount:100,
        shareCount:100,
        user:
        {
            name : "DummyUser",
            username : "buzzupuser"
        }
    }

    const scrollAreaRef = useRef(null);
    let [isAtTop,setIsAtTop] = useState(true);

    function scrolled(){
        if(scrollAreaRef.current)
        {
            if(!isAtTop && scrollAreaRef.current.scrollTop==0)
                setIsAtTop(true);
            else if(isAtTop && scrollAreaRef.current.scrollTop!=0)
                setIsAtTop(false);
        }
    }
    return(
        <div className="mid-part">
            <div className={`h-full flex flex-col relative`}>
                <CreateBuzzCard className={`${isAtTop?"max-h-full card":"max-h-0 border-light/10 opacity-0 pointer-events-none"} transition-all duration-500`}></CreateBuzzCard>
                <div className='p-4 flex justify-evenly bg-darker'>
                    <div className='text-accent'>FOR YOU</div>
                    <div>|</div>
                    <div>FOLLOWING</div>
                </div>
                <div id='scrollArea' ref={scrollAreaRef} onScroll={scrolled} className={`grow overflow-scroll transition-all`}>
                    {/* <Post></Post> */}
                </div>
            </div>
        </div>
    )
}