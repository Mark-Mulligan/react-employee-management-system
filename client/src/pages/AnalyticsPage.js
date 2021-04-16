import React from 'react';
import LogoutButton from '../components/buttons/LogoutButton';

const AnalyticsPage = ({ history, setUserLoggedIn }) => {

  return (
    <div>
      <h2>Dashboard</h2>
      <LogoutButton history={history} setUserLoggedIn={setUserLoggedIn} />
    </div>
  )
}

export default AnalyticsPage;