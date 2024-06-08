import LeftSidebar from "../Sidebars/LeftSidebar";
import RightSidebar from "../Sidebars/RightSidebar";
import HomePage from "../AppSegments/HomePage";
import ProfilePage from "../AppSegments/ProfilePage";
import BuzzPage from "../AppSegments/BuzzPage";
import { Routes , Route } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import SettingsPage from "../AppSegments/SettingsPage";

export default function BuzzupApp()
{
    const auth = useAuth();

    return(
        <div className='h-screen w-screen flex justify-center overflow-hidden'>
            <LeftSidebar/>
            <div className="mid-part">
                {(auth?.isAuthorized)?(
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/user/:id" element={<ProfilePage/>}/>
                        <Route path="/buzz/:id" element={<BuzzPage/>}/>
                        <Route path="/settings" element={<SettingsPage/>}/>
                        <Route path="/*" element={<h1>404</h1>}/>
                    </Routes>
                ):(
                    <Routes>
                        <Route path="/user/:id" element={<ProfilePage/>}/>
                        <Route path="/buzz/:id" element={<BuzzPage/>}/>
                        <Route path="/*" element={<h1>404</h1>}/>
                    </Routes>
                )}
            </div>
            <RightSidebar/>
        </div>
    )
}