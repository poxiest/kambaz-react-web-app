import { Routes, Route, Navigate } from "react-router";
import Signin from "./SignIn";
import Profile from "./Profile1";
import Signup from "./SignUp";
import AccountNavigation from "./Navigation";

export default function Account() {
  return (
    <div id="wd-account-screen">
      <div className="d-none d-md-block">
        <AccountNavigation />
      </div>
      <div className="wd-main-content-offset" style={{maxWidth: "500px", width: "100%"}}>
        <Routes>
          <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
