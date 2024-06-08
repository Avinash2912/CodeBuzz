import { useAuth } from '../../Contexts/AuthContext';
import logo from '../../assets/Logo/LogoNavbar.png';;
import User from '../Common/User';
import { Link,NavLink } from "react-router-dom";
import LoginPromptCard from '../Common/LoginPromptCard';

type SideBarButtonProps = {icon:string,label:string,to:string};
function SideBarButton({icon,label,to}:SideBarButtonProps)
{
    const classStyle = 'flex items-center w-full p-4 relative transition-colors after:absolute after:h-full after:rounded-r-full after:w-0 after:top-0 after:left-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300';
    return(
        <NavLink to={to} className={({ isActive }) => (isActive ? "font-bold" : "font-semibold text-light/70") + " " + classStyle}>
                <span className="z-10 material-icons text-sm md:text-xl md:mr-4">{icon}</span>
                <h1 className="z-10 hidden md:block">{label}</h1>
        </NavLink>
    )
}

export default function LeftSidebar()
{
    const auth = useAuth();

    if(auth?.isAuthorized)
    {
        return(
            <div className="md:w-96 shrink-0 flex flex-col justify-between">
                <div className="card p-0 md:p-6 grow flex flex-col justify-between">
                    <div>
                        <Link to='/landing'><img src={logo} className='w-2/3 mb-10 p-4 hidden md:block' alt="" /></Link>
                        <SideBarButton to='/' icon='home' label='HOME'></SideBarButton>
                        <SideBarButton to='/explore' icon='travel_explore' label='EXPLORE'></SideBarButton>
                        <SideBarButton to={`/user/${auth.userdata?.username}`} icon='account_circle' label='PROFILE'></SideBarButton>
                    </div>
                    <div>
                        <SideBarButton to='/settings' icon='settings' label='SETTINGS'></SideBarButton>
                    </div>
                </div>
                <div className="card hidden md:block">
                    <h1 className='text-light/50 mb-2'>Buzzing As</h1>
                    <div className=''>
                        <User></User>
                        <h1 className='mt-4 text-xs opacity-50'>Not You?<button onClick={auth.APIFunctions.SignOut} className='ml-1 text-accent'>Sign Out</button>.</h1>
                    </div>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <div className="md:w-96 shrink-0 flex flex-col justify-between">
                <div className="card p-0 md:p-6 grow flex flex-col justify-between">
                    <div>
                        <Link to='/landing'><img src={logo} className='w-2/3 mb-10 p-4 hidden md:block' alt="" /></Link>
                        <SideBarButton to='/explore' icon='travel_explore' label='EXPLORE'></SideBarButton>
                    </div>
                    <div>
                        {/* <SideBarButton to='/settings' icon='settings' label='SETTINGS'></SideBarButton> */}
                    </div>
                </div>
                <LoginPromptCard className=' hidden md:block'/>
            </div>
        )
    }
}