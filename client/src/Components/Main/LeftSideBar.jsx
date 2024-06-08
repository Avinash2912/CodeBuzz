import { useAuth } from '../../Contexts/AuthContext';
import logo from '../../assets/Logo/LogoNavbar.png';;
import SideBarButton from './SideBarButton';
import User from './User';
import { Link,NavLink } from "react-router-dom";
import Button from './Button'

export default function LeftSideBar()
{
    const auth = useAuth();
    let activeClass = 'text-xl'

    if(!auth.isAuthorized)
    {
        return(
            <div className="md:w-96 shrink-0 flex flex-col justify-between">
                <div className="card p-1 md:p-6 grow flex flex-col justify-between">
                    <div>
                        <img src={logo} className='w-2/3 mb-10 p-4 hidden md:block' alt="" />
                        <NavLink to='/explore' className={({isActive}) => {return isActive?activeClass:""}}><SideBarButton icon='travel_explore' label='EXPLORE'></SideBarButton></NavLink>
                    </div>
                </div>
                <div className="card hidden md:block">
                    <h1 className='text-light/50 mb-2'>You are not Signed In</h1>
                    <div className='flex flex-col gap-4 p-4'>
                        <Link to='/signin'><Button big='true' className='w-full'>SIGN IN</Button></Link>
                        <Link to='/signup'><Button big='true' outline='true' className='w-full'>SIGN UP</Button></Link>
                    </div>
                </div>
            </div>
            
        )
    }

    return(
        <div className="md:w-96 shrink-0 flex flex-col justify-between">
            <div className="card p-1 md:p-6 grow flex flex-col justify-between">
                <div>
                    <img src={logo} className='w-2/3 mb-10 p-4 hidden md:block' alt="" />
                    <NavLink to='/' className={({isActive}) => {return isActive?activeClass:""}}><SideBarButton icon='home' label='HOME'></SideBarButton></NavLink>
                    <NavLink to='/explore' className={({isActive}) => {return isActive?activeClass:""}}><SideBarButton icon='travel_explore' label='EXPLORE'></SideBarButton></NavLink>
                    <NavLink to={`/user/${auth.userdata.username}`} className={({isActive}) => {return isActive?activeClass:""}}><SideBarButton icon='account_circle' label='PROFILE'></SideBarButton></NavLink>
                </div>
                <div>
                    <NavLink to='/settings' className={({isActive}) => {return isActive?activeClass:""}}><SideBarButton icon='settings' label='SETTINGS'></SideBarButton></NavLink>
                </div>
            </div>
            <div className="card hidden md:block">
                <h1 className='text-light/50 mb-2'>Buzzing As</h1>
                <div className=''>
                    
                    <User></User>
                    <h1 className='mt-4 text-xs opacity-50'>Not You? <button onClick={auth.signout} className='text-accent'>Sign Out</button>.</h1>
                </div>
            </div>
        </div>
    )
}