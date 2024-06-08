import { Link } from 'react-router-dom';
import logo from '../../assets/Logo/LogoNavbar.png';;

export default function RightSidebar()
{
    return(
        <div className="w-96 hidden xl:flex flex-col shrink-0">
            <div className="card p-8 text-xs opacity-60">
                <Link to='/landing'><img src={logo} className='w-1/3 mb-4 hidden md:block' alt="" /></Link>
                <h1>ABOUT | HELP | PRIVACY POLICY</h1>
                <a href='https://trello.com/b/lNjl8SCe/buzzup'>https://trello.com/b/lNjl8SCe/buzzup</a>
                <h1>© 2023 BUZZUP</h1>
            </div>
        </div>
    )
}