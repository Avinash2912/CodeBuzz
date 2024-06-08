import { useNavigate } from 'react-router-dom';
import yoda from '../../assets/yoda.jpg';
import { useAuth } from '../../Contexts/AuthContext';
export default function User(props)
{
    const auth = useAuth();
    const reactNavigator = useNavigate();

    let data = props.data;
    if(!data)
    {
        if(!auth.isAuthorized)
        {
            return <>NOT LOGGED IN</>
        }
        data = auth.userdata;
    }

    function userClicked()
    {
        reactNavigator(`/user/${data.username}`)
    }

    return(
        <div onClick={userClicked} className={`${props.className} items-center cursor-pointer flex`}>
            <img src={yoda} className={`hover:scale-105 transition-transform object-cover w-14 h-14 bg-accent rounded-full mr-4 ${(props.small)?("w-7 h-7"):("")}`}></img>
            <div className='flex flex-col justify-center'>
                <h1 className={`font-bold hover:text-accent transition-colors duration-500 ${(props.small)?("text-sm"):("")}`}>{data.name}</h1>
                <h2 className='text-light/50 text-xs hover:text-accent transition-colors duration-500'>@{data.username}</h2>
            </div>
            {props.children}
        </div>
    )
}