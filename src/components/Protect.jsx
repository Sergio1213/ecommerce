import React from 'react';
import { Navigate } from 'react-router-dom';

const Protect = ({ element }) => {
  const email = localStorage.getItem('email');
  const username = localStorage.getItem('username');
  const jwt = localStorage.getItem('jwt');

  if (!email || !username || !jwt) {
    return <Navigate to="/Home" />;
  }

  return element;
};

export default Protect;
