import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LogoutButton = ({ history, setUserLoggedIn }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function checkWindowWidth() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', checkWindowWidth);
    return () => window.removeEventListener('resize', checkWindowWidth);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/auth/logout');
      if (response.data.success) {
        setUserLoggedIn(false);
        history.push('/')
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button className={`btn btn-dark ${windowWidth <= 576 ? 'btn-block' : null}`} onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton;