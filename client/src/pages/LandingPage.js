import React, { useEffect } from "react";
import LoginRegisterForm from "../components/LoginRegisterForm";
import "./LandingPage.css";

const LandingPage = ({ history, userLoggedIn, setUserLoggedIn }) => {
  useEffect(() => {
    if (userLoggedIn) {
      history.push("/dashboard");
    }
  }, [userLoggedIn, history]);

  return (
    <div className="landing-page-container max-width-600 container text-center">
      <h1>Employee Management System</h1>
      <hr />
      <LoginRegisterForm history={history} setUserLoggedIn={setUserLoggedIn} />
    </div>
  );
};

export default LandingPage;
