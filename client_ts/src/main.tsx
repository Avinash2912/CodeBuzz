import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvier } from './Contexts/AuthContext.tsx';
import { ToastProvier } from './Contexts/ToastContext.tsx';
import React from 'react';
import LandingPage from './Components/Pages/LandingPage/LandingPage.tsx';
import Soon from './Components/Pages/LandingPage/Soon.tsx';
import AboutDevs from './Components/Pages/LandingPage/AboutDevs.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvier>
        <AuthProvier>
          {(import.meta.env.VITE_HIDE == "false")?(
              <App/>
            ):(
              <Routes>
                <Route path="/*" element={<LandingPage />} />
                <Route path="/about" element={<AboutDevs/>} />
                <Route path="/soon" element={<Soon />} />
              </Routes>
          )}
        </AuthProvier>
      </ToastProvier>
    </BrowserRouter>
  </React.StrictMode>
)
