import { useRef , useState } from "react";
import CreateBuzzCard from "../Common/CreateBuzzCard";
import LoginPromptCard from "../Common/LoginPromptCard";

export default function HomePage()
{
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);
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
        <div className={`h-full flex flex-col relative`}>
            <CreateBuzzCard className={`${isAtTop?"max-h-full card":"max-h-0 border-light/10 opacity-0 pointer-events-none"} transition-all duration-500`}></CreateBuzzCard>
            <div className='p-4 flex justify-evenly bg-darker'>
                <div className='text-accent'>FOR YOU</div>
                <div>|</div>
                <div>FOLLOWING</div>
            </div>
            <div id='scrollArea' ref={scrollAreaRef} onScroll={scrolled} className={`grow overflow-auto transition-all`}>
                <LoginPromptCard className=' hidden md:block'/>
                <LoginPromptCard className=' hidden md:block'/>
                <LoginPromptCard className=' hidden md:block'/>
                <LoginPromptCard className=' hidden md:block'/>
                <LoginPromptCard className=' hidden md:block'/>
                <LoginPromptCard className=' hidden md:block'/>
                <LoginPromptCard className=' hidden md:block'/>
            </div>
        </div>
    )
}