// src/pages/LoginPage.js
import React from 'react';
import Login from '../components/Login';

const LoginPage = ({ setUser }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Login setUser={setUser} />  {/* Pasa setUser como prop */}
    </div>
  );
};

export default LoginPage;
