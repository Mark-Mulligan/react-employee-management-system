import React from 'react';
import axios from 'axios';

const GetUserButton = () => {
  const getUserData = async () => {
    try {
      const response = await axios.get('/api/auth/user');
      console.log(response);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <button onClick={getUserData} className="btn btn-outline-dark">Get User Data</button>
  )
}

export default GetUserButton;