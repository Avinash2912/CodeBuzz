import { useParams , Link , useNavigate, json} from 'react-router-dom';
import yoda from '../../assets/yoda.jpg';
import Post from './Post';
import { useEffect , useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import Button from './Button';
import axios from '../../axios';

export default function ProfilePage()
{
    let reactNavigator = useNavigate();
    const {id} = useParams();
    const auth = useAuth();

    const [data,setData] = useState(null);

    useEffect(()=>{
        getUser();
    },[id])
    
    async function getUser()
    {
        try
        {
            let response;
            if(auth.isAuthorized)
            {
                response = await axios.get(`user/${id}`,{headers:{"x-access-token":auth.userdata.token}});
            }
            else
            {
                response = await axios.get(`user/${id}`);
            }
            setData(response.data.data);
        }
        catch(e)
        {
            console.log(e);
        }
    }

    async function toggleFollow()
    {
        try
        {
            let response = await axios.post("/followtoggle",
            {userId:data.id},
            {headers:{"x-access-token":auth.userdata.token}});
            let prev = data.totalFollowers;
            setData({...data,totalFollowers:prev+((response.data.data)?1:-1),isFollowed:response.data.data});
        }
        catch(e)
        {
            console.log(e);
        }
    }

    // Shimmer
    if(!data)
    {
        return(
            <div className='mid-part flex flex-col overflow-scroll'>
                <div className='card shimmer'>
                    <div className='pattern h-48 rounded-xl'></div>
                    <div className='flex justify-between items-center'>
                        <img src={yoda} className='object-cover w-32 h-32 border-8 border-dark relative -mt-16 ml-4 bg-accent rounded-full mr-4' alt="" /> 
                    </div>
                    <div className=''>
                        <div className=''>
                            <h1 className='font-bold text-2xl'>Loading</h1>
                            <h2 className='text-light/50'>Loading</h2>
                        </div>
                    </div>
                    <div className='flex mt-4 flex-wrap'>
                        <div className='card grow flex flex-col justify-center items-center'>
                        </div>
                        <div className='card grow flex flex-col justify-center items-center'>
                        </div>
                        <div className='card grow flex flex-col justify-center items-center'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className='mid-part flex flex-col overflow-scroll'>
            <div className='card'>
                <div className='pattern h-48 rounded-xl'></div>
                <div className='flex justify-between items-center'>
                    <img src={yoda} className='object-cover w-32 h-32 border-8 border-dark relative -mt-16 ml-4 bg-accent rounded-full mr-4' alt="" /> 
                    {auth.isAuthorized?(
                        (auth.userdata.username!=id)?(
                            <Button onClick={toggleFollow} outline={data.isFollowed?"UNFOLLOW":null}>{data.isFollowed?"UNFOLLOW":"FOLLOW"}</Button>
                        ):(
                        <Link to='/settings'><Button>EDIT PROFILE</Button></Link>
                        )
                    ):
                    ""}
                </div>
                <div className=''>
                    <div className=''>
                        <h1 className='font-bold text-2xl'>{data.name}</h1>
                        <h2 className='text-light/50'>{`@${data.username}`}</h2>
                    </div>
                    <h3 className='text-light/50 mt-4'>{data.bio}</h3>
                    <a href={`https://${data.website}`} className='text-light/50'>{data.website}</a>
                </div>
                <div className='flex mt-4 flex-wrap'>
                    <div className='card grow flex flex-col justify-center items-center'>
                        <h1 className='text-xl font-black'>{data.totalBuzzes}</h1>
                        <h1>Buzzes</h1>
                    </div>
                    <div className='card grow flex flex-col justify-center items-center'>
                        <h1 className='text-xl font-black'>{data.totalFollowers}</h1>
                        <h1>Followers</h1>
                    </div>
                    <div className='card grow flex flex-col justify-center items-center'>
                        <h1 className='text-xl font-black'>{data.totalFollowing}</h1>
                        <h1>Following</h1>
                    </div>
                </div>
            </div>
            {/* <Post/> */}
        </div>
    )
}