import React from 'react';
import axios from 'axios';

const LogoutButton = ({ history, setUserLoggedIn }) => {
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/auth/logout');
      if (response.data.success) {
        setUserLoggedIn(false);
        history.push('/')
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button className="btn btn-dark" onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton;