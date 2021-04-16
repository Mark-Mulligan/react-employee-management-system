import React from 'react';
import GetUserButton from '../components/buttons/GetUserButton';
import LoginRegisterForm from '../components/LoginRegisterForm';

const LandingPage = ({ history, setUserLoggedIn }) => {

  return (
    <div className="container mt-4 text-center">
      <h1>Employee Management System</h1>
      <LoginRegisterForm history={history} setUserLoggedIn={setUserLoggedIn} />
      <GetUserButton />
    </div>
  )
}

export default LandingPage;