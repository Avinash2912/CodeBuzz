import Button from "./Button";
import yoda from '../../assets/yoda.jpg'
import Shimmer from "./Shimmer";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export type ProfileCardType = {id:string,isFollowed:boolean,name:string,username:string,bio:string,totalBuzzes:number,totalFollowers:number,totalFollowing:number} | null;
type PropsType = {data?:ProfileCardType};
export default function ProfileCard(props:PropsType)
{
    const {id} = useParams();
    const auth = useAuth();

    const [data,setData] = useState<ProfileCardType>();

    useEffect(()=>{
        if(props.data)
            setData(props.data);
    },[props.data])

    if(data === null || data === undefined)
    {
        return <Shimmer shimmerType="profile"/>
    }

    async function followToggle()
    {
        if(!data)return;

        //API Call
        let response = await auth?.APIFunctions.PostRequest('/followtoggle',{userId:props.data?.id},true);

        if(response.status == 200)
        {
            let isFollowed = !data?.isFollowed;
            let totalFollowers = data?.totalFollowers + (isFollowed?1:-1);
            setData({...data,totalFollowers:totalFollowers,isFollowed:isFollowed});
        }

    }

    return(
        <div className='card'>
            <div className='pattern h-48 rounded-xl'></div>
            <div className='flex justify-between items-center'>
                <img src={yoda} className='object-cover w-24 h-24 sm:w-32 sm:h-32 border-8 border-dark relative -mt-12 sm:-mt-16 sm:ml-4 bg-accent rounded-full' alt="" /> 
                {(auth?.isAuthorized)?(
                    (auth.userdata?.username!=id)?(
                        <Button onClick={followToggle} outline={data.isFollowed?true:false}>{data.isFollowed?"UNFOLLOW":"FOLLOW"}</Button>
                    ):(
                        <Link to='/settings'><Button>EDIT PROFILE</Button></Link>
                    )
                ):("")}        
            </div>
            <div className=''>
                <div className=''>
                    <h1 className='font-bold text-2xl'>{data.name}</h1>
                    <h2 className='text-light/50'>{`@${data.username}`}</h2>
                </div>
                <h3 className='text-light/50 mt-4'>{data.bio}</h3>
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
    )
}