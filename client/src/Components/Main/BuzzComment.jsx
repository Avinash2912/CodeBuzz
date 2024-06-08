import User from './User';
import { useRef , useState , useEffect} from 'react';
export default function BuzzComment(props)
{
    const textareaRef = useRef(null);
    
    let [bodyText,setBodyText] = useState("");
    let [replyMode,setReplyMode] = useState(false);
    
    if(!props.data)
    {
        return(
            <div className='mt-4'>
                <div className='shimmer flex flex-col gap-4'>
                    <div className='flex gap-4 items-center'>
                        <div className='h-full'>
                            <div className='h-7 w-7 rounded-full bg-light/10'/>
                        </div>
                        <div className='h-full w-full flex flex-col gap-4'>
                            <div className='h-2 w-1/2 rounded-full bg-light/10'/>
                            <div className='h-2 w-1/4 rounded-full bg-light/10'/>
                        </div>
                    </div>
                    <div className='h-2 rounded-full bg-light/10'/>
                    <div className='h-2 rounded-full bg-light/10'/>
                </div>
            </div>
        )
    }

    function toggleReplyMode()
    {
        setReplyMode(!replyMode);
    }

    function postReply()
    {
        //API CALL HERE
        toggleReplyMode();
    }

    return(
        <div className='mt-4'>
            <hr className='border border-light/10' />
            <User small className='mt-4'></User>
            <p className='text-light/75 text-sm mt-2'>Always with you, it cannot be done.</p>
            <p className='text-xs text-light/50'>26/12/23</p>
            {props.children}
            <h1 onClick={toggleReplyMode} className={`mt-4 cursor-pointer hover:text-accent transition-all ${(!replyMode)?"max-h-16":"max-h-0 opacity-0 pointer-events-none"}`}>Reply</h1>
            <div className={`flex transition-all mt-4 ${(replyMode)?"max-h-16":"max-h-0 opacity-0 pointer-events-none"}`}>
                <input value={bodyText} onChange={e=>{setBodyText(e.target.value);}} placeholder="Post a Reply"
                className='w-full bg-darker overflow-hidden p-4 outline-none resize-none
                focus:border-b-accent border-b-light/10 border-b-2 transition-colors rounded-tl-lg
                ' ></input>
                <button onClick={postReply} className='bg-accent px-4 py-2 rounded-e-lg font-black hover:brightness-95 active:scale-95 transition-transform duration-300 flex items-center'>
                    <span className="material-icons">
                    send
                    </span>
                </button>
            </div>
        </div>
    )
}