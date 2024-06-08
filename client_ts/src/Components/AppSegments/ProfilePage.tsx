import ProfileCard , { ProfileCardType } from "../Common/ProfileCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useToast } from "../../Contexts/ToastContext";
import PostArray from "../Common/Post/PostArray";
import LoginPromptCard from "../Common/LoginPromptCard";

export default function ProfilePage()
{
    const {id} = useParams();
    const auth = useAuth();
    const toast = useToast();
    const [profileData,setProfileData] = useState<ProfileCardType>(null);

    useEffect(()=>{
        getUser();
    },[id])

    async function getUser()
    {
        let response = await auth?.APIFunctions.GetRequest(`user/${id}`,auth?.isAuthorized);
        if(response?.status == 200)
        {
            let profileData:ProfileCardType = response.data.data;
            console.log(profileData?.id);
            setProfileData(profileData);
        }
        else if(response?.status == 404)
        {
            console.log("TODO TOAST PROFILE NOT FOUND");
            toast?.CreateToast({title:"User Not Found",body:"",mode:"Error"})
            setProfileData(null);
        }
        else
        {
            setProfileData(null);
        }
    }

    return(
        <div className="overflow-y-auto overflow-x-hidden h-full">
            <ProfileCard data={profileData}/>
            {(profileData?.id == undefined) || <PostArray limit={auth?.isAuthorized?undefined:0} route={`/buzzes/${profileData?.id}`}>{
                auth?.isAuthorized || <LoginPromptCard/>
            }</PostArray>}
        </div>
    )
}