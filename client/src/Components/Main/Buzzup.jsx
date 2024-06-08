import LeftSideBar from './LeftSideBar';
import Home from './Home';
import ProfilePage from './ProfilePage';
import BuzzPage from './BuzzPage';
import NotFound404 from './NotFound404';
import ExplorePage from './ExplorePage';
import {Navigate, Route,Routes} from 'react-router-dom';
import logo from '../../assets/Logo/LogoNavbar.png';;
import SettingsPage from './SettingsPage';
import { useAuth } from '../../Contexts/AuthContext';
import SigninPopup from './SigninPopup';

export default function Buzzup()
{
    const auth = useAuth();
    return(
        <div className='h-full w-full flex justify-center'>
            <LeftSideBar></LeftSideBar>
            {auth.isAuthorized?(
                <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/user/' element={<ProfilePage></ProfilePage>}></Route>
                    <Route path='/user/:id' element={<ProfilePage></ProfilePage>}></Route>
                    <Route path='/buzz/:id' element={<BuzzPage></BuzzPage>}></Route>
                    <Route path='/settings' element={<SettingsPage/>}></Route>
                    <Route path='/explore' element={<ExplorePage/>}></Route>
                    <Route path='/*' element={<NotFound404></NotFound404>}></Route>
                </Routes>
            ):(
                <Routes>
                    <Route path='/user/:id' element={<ProfilePage></ProfilePage>}></Route>
                    <Route path='/buzz/:id' element={<BuzzPage></BuzzPage>}></Route>
                    <Route path='/explore' element={<ExplorePage/>}></Route>
                    <Route path='/*' element={<SigninPopup/>}></Route>
                </Routes>
            )}
            <div className="w-96 hidden xl:flex flex-col shrink-0">
                <div className="card p-8 text-xs opacity-60">
                    <img src={logo} className='w-1/3 mb-4 hidden md:block' alt="" />
                    <h1>ABOUT | HELP | PRIVACY POLICY</h1>
                    <a href='https://trello.com/b/lNjl8SCe/buzzup'>https://trello.com/b/lNjl8SCe/buzzup</a>
                    <h1>© 2023 BUZZUP</h1>
                </div>
            </div>
        </div>
    )
}