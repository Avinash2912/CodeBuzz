import Post from './Post';
import BuzzComment from './BuzzComment';
import ReplyComment from './ReplyComment';
import { useParams } from 'react-router-dom';
import { useEffect ,useRef , useState} from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import axios from '../../axios';

export default function BuzzPage()
{
    const auth = useAuth();
    const {id} = useParams();

    let [bodyText,setBodyText] = useState("");
    let [data,setData] = useState(null);

    useEffect(()=>{
        fetchData();
        //TODO
        //check if buzz exists
        //otherwise navigate to 404
    },[])

    async function fetchData()
    {
        try
        {
            let response;
            if(auth.isAuthorized)
            {
                response = await axios.get(`buzz/${id}`,{headers:{"x-access-token":auth.userdata.token}});
            }
            else
            {
                response = await axios.get(`buzz/${id}`);
            }
            setData(response.data.data);
        }
        catch(e)
        {
            console.log(e);
        }
    }
    return(
        <div className='mid-part flex flex-col overflow-scroll'>            
            <Post data={data} hideCommentButton>
                <div className='mt-4'>
                    <hr className='border border-light/10' />
                    <div className='flex  mt-4'>
                        <input value={bodyText} onChange={e=>{setBodyText(e.target.value);}} placeholder="Post a Comment"
                        className='w-full bg-darker overflow-hidden p-4 outline-none resize-none
                        focus:border-b-accent border-b-light/10 border-b-2 transition-colors duration-500 rounded-tl-lg
                        ' ></input>
                        <button className='bg-accent px-4 py-2 rounded-e-lg font-black hover:brightness-95 active:scale-95 transition-transform duration-300 flex items-center'>
                            <span className="material-icons">
                            send
                            </span>
                        </button>
                    </div>
                </div>
                <BuzzComment>
                <ReplyComment></ReplyComment>
                <ReplyComment></ReplyComment>
                <ReplyComment></ReplyComment>
                </BuzzComment>
                <BuzzComment></BuzzComment>
            </Post>
        </div>
    )
}