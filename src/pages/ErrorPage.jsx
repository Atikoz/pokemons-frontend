import React from 'react';
import Navbar from '../ui/Navbar';

const ErrorPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Navbar />
      <h1 style={{
        marginTop: 25
      }}>Page doesn't exist!</h1>
    </div>
  );
};

export default ErrorPage;
