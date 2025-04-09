// src/pages/LoginPage.js
import React from 'react';
import Login from '../components/Login';

const LoginPage = ({ setUser }) => {
  return (
    <div>
      <Login setUser={setUser} />  {/* Pasa setUser como prop */}
    </div>
  );
};

export default LoginPage;
