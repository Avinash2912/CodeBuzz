import BuzzupApp from "./Components/Pages/BuzzupApp";
import SignInPage from "./Components/Pages/SignInPage";
import SignUpPage from "./Components/Pages/SignUpPage";

import { Routes, Route } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import LandingPage from "./Components/Pages/LandingPage/LandingPage";

function App() {
  const auth = useAuth();
  if (auth?.isValidated) {
    if (auth.isAuthorized) {
      return (
        <Routes>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/*" element={<BuzzupApp />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/*" element={<BuzzupApp />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      );
    }
  } else {
    return <h1>User is being validated...</h1>;
  }
}

export default App;
