import {Navigate, Route,Routes} from 'react-router-dom';
import SignInPage from './Components/Login/SignInPage';
import SignUpPage from './Components/Login/SignUpPage';
import Buzzup from './Components/Main/Buzzup';
import {useAuth} from './Contexts/AuthContext';
import Loading from './Components/Loading';
import API from './axios';
import { useEffect } from 'react';

function App()
{
  const auth = useAuth();
  
  useEffect(()=>{
    API.interceptors.response.use((response)=>{
      return response;
    }, (error) => {
      if(error.response.status == 400)
      {
        auth.signout();
        alert("Session Expired");
      }
      return Promise.reject(error);
    });
    
    // Close Interceptor
    // API.interceptors.request.eject(interceptor);
  },[])

  return(
    <div className='overflow-hidden'>
      <Loading active={!auth.hasPerformedValidation}/>
      <div className={`w-screen h-screen transition-transform duration-1000 ${auth.hasPerformedValidation?"translate-y-0":"translate-y-full"}`}>
        {
          (auth.hasPerformedValidation)?(
            <Routes>
              <Route path='/signup' element={auth.isAuthorized?<Navigate to='/'/>:<SignUpPage></SignUpPage>}/>
              <Route path='/*' element={<Buzzup></Buzzup>}/>
              <Route path='/signin' element={auth.isAuthorized?<Navigate to='/'/>:<SignInPage></SignInPage>}/>
            </Routes>
          ):""
        }
      </div>
    </div>
  );
}
// TODO
// Refresh Token
//comment
//Image upload

export default App;
